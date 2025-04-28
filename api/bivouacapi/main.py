"""Main module"""

from datetime import datetime, timedelta
from io import BytesIO

import sqlalchemy
from fastapi import Depends, FastAPI, Query, Response
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy.sql import text

from bivouacapi.logs import initLogger
from bivouacapi.models import PostCancelReservation, PostReservation
from bivouacapi.settings import MAP_LAYERS_ENUM, session, settings
from bivouacapi.utils import check_locations_argument, generate_pdf, send_summary_mail

logger = initLogger(__name__)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.PROJECT_VERSION,
    debug=settings.DEBUG,
    root_path=settings.ROOT_PATH,
    swagger_ui_parameters={"defaultModelsExpandDepth": -1},
    openapi_url=settings.openapi_url,
    docs_url=settings.docs_url,
    root_path_in_servers=False,
)
if settings.DEBUG:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


# Dependency
def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()


@app.get(
    "/",
    summary="Get the API version number",
    tags=["Other"],
)
async def root():
    """Retrieve API version"""
    logger.info("root endpoint")
    return {"message": f"{settings.APP_NAME} version {settings.PROJECT_VERSION}"}


@app.get(
    "/about/",
    summary="Get the PostgreSQL / PostGIS versions",
    tags=["Other"],
)
async def get_versions(db: Session = Depends(get_db)):
    """Retrieve PostgreSQL and PostGIS version"""
    logger.info("get_versions endpoint")
    query = (
        "SELECT version() as postgresql_version, PostGIS_Version() as postgis_version"
    )
    result = db.execute(text(query)).mappings().one()
    logger.info("PostgreSQL and PostGIS versions successfully retrieved")
    return {
        "postgresql_version": result["postgresql_version"],
        "postgis_version": result["postgis_version"],
    }


@app.get(
    "/map/",
    summary="Get a map layer",
    tags=["Data"],
)
async def get_map_layer(
    map_layer: MAP_LAYERS_ENUM,
    fields: list[str] = Query(None),
    db: Session = Depends(get_db),
):
    """Retrieve map layer

    - **map_layer**: name of the table
    - **fields**: fields to be retrieved
    """
    logger.info("get_map_layer endpoint")
    try:
        properties = []
        if fields:
            for field in fields:
                properties.extend((f"'{field}'", "''" if field == "" else f'"{field}"'))

        query = f"""SELECT json_build_object(
                    'type', 'Feature',
                    'layername', '{map_layer.value}',
                    'geometry', ST_AsGeoJSON(geom)::json,
                    'properties', json_build_object(
                        {', '.join(properties)}
                    )
                ) as feature
                FROM public.{map_layer.value}
            """

        result = db.execute(text(query))
        data = [feat[0] for feat in result.fetchall()]
        logger.info(f"{map_layer.value} data successfully retrieved")
        return JSONResponse(content=jsonable_encoder({"content": data}))
    except sqlalchemy.exc.ProgrammingError:
        logger.critical(f"Error while retrieving data from {map_layer.value} layer")
        return JSONResponse(
            status_code=400,
            content=jsonable_encoder({"content": "Error while retrieving data"}),
        )


@app.post(
    "/reservations/",
    summary="Create a reservation",
    tags=["Data"],
)
async def create_reservation(
    request: PostReservation, send_summary: bool = False, db: Session = Depends(get_db)
) -> Response:
    """Create a new reservation

    - **request**: request model
    """
    logger.info("create_reservation endpoint")
    date_reservation = request.date
    nb_people_reservation = request.nb_people
    email_reservation = request.email
    if email_reservation:
        email = email_reservation.replace("'", " ")
    else:
        email = None
    fr_or_foreign_reservation = request.fr_or_foreign
    department_reservation = request.department
    if department_reservation:
        department = department_reservation.replace("'", " ")
    else:
        department = None

    locations_reservation = request.locations
    quizz_note_reservation = request.quizz_note
    if quizz_note_reservation:
        comment = quizz_note_reservation.replace("'", " ")
    else:
        comment = None
    tmb = request.tmb
    nb_tents_reservation = 1

    check_locations = await check_locations_argument(locations_reservation)
    if check_locations.status_code == 400:
        return check_locations

    try:
        query = text(
            """
            INSERT INTO public.reservations (nb_tents, nb_people, email, fr_or_foreign, department, quizz_note, tmb)
            VALUES (:nb_tents, :nb_people, :email, :fr_or_foreign, :department, :quizz_note, :tmb)
            RETURNING id, uuid
        """
        )
        params = {
            "nb_tents": nb_tents_reservation,
            "nb_people": nb_people_reservation,
            "email": email,
            "fr_or_foreign": fr_or_foreign_reservation,
            "department": department,
            "quizz_note": comment,
            "tmb": tmb,
        }
        result = db.execute(query, params)
        reservation_number, reservation_uuid = result.fetchone()
        db.commit()
    except sqlalchemy.exc.ProgrammingError:

        db.rollback()
        logger.critical("Error during registration")
        return JSONResponse(
            status_code=400,
            content=jsonable_encoder({"content": "Error during registration"}),
        )
    except:
        logger.critical("Error during registration")
        return JSONResponse(
            status_code=400,
            content=jsonable_encoder({"content": "Error during registration"}),
        )

    for nb, location in enumerate(locations_reservation):
        new_date = date_reservation + timedelta(days=nb)
        query = text(
            """
            INSERT INTO public.reservations_locations (reservation, date, geom)
            VALUES (:reservation_number, :new_date, ST_GeomFromText(:location_geom))
            """
        )
        params = {
            "reservation_number": reservation_number,
            "new_date": new_date,
            "location_geom": f"POINT({location[1]} {location[0]})",
        }
        db.execute(query, params)
    db.commit()
    logger.info(f"Reservation {reservation_number} successfully registered")

    try:
        # Send summary by e-mail
        if send_summary:
            query = text(
                """
                WITH s AS (
                    SELECT rl.date::text AS date, nb_people, email,
                        zb.commune, rl.name_bivouac_zoning, r.id
                    FROM public.reservations r
                    JOIN public.reservations_locations rl ON rl.reservation = r.id
                    JOIN public.zonage_bivouac zb ON zb.nom = rl.name_bivouac_zoning
                    WHERE r.id = :reservation_number
                    ORDER BY date
                )
                SELECT string_agg(s.date::text, ',') AS date, nb_people, email,
                    string_agg(s.commune, ',') AS communes,
                    string_agg(s.name_bivouac_zoning, ',') AS reserves
                FROM s
                GROUP BY id, nb_people, email
            """
            )
            params = {"reservation_number": reservation_number}
            result = db.execute(query, params).mappings().one()

            cancel_url = f"{settings.WEBSITE_DOMAIN}/reservation-bivouac/cancel/{reservation_uuid}"

            pdf_content, _pdf_name = await generate_pdf(attributes=result)

            result = await send_summary_mail(
                result.email, cancel_url, BytesIO(pdf_content)
            )
            return result
    except sqlalchemy.exc.ProgrammingError:
        db.rollback()
        logger.critical("Error during registration")
        return JSONResponse(
            status_code=400,
            content=jsonable_encoder({"content": "Error during registration"}),
        )


@app.get(
    "/reservations/",
    summary="Get the number of tents by date and bivouac zoning",
    tags=["Data"],
)
async def get_number_tents_date_bivouac_zoning(
    start_date,
    db: Session = Depends(get_db),
):
    """Get the number of tents by date and bivouac zoning

    - **start_date**: starting date
    """
    logger.info("get_number_tents_date_bivouac_zoning")
    try:
        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        end_date = start_date + timedelta(days=1)
        query = text(
            """
            SELECT loc.date, loc.name_bivouac_zoning,
            SUM(reservations.nb_tents) AS nb_tents
            FROM reservations_locations AS loc
            LEFT JOIN reservations
            ON loc.reservation = reservations.id
            WHERE reservations.annule is false
            AND loc.date BETWEEN :start_date AND :end_date
            GROUP BY loc.date, loc.name_bivouac_zoning
            ORDER BY loc.date
        """
        )
        params = {"start_date": start_date, "end_date": end_date}
        result = db.execute(query, params)

        data = {}
        for row in result.fetchall():
            date, name_bivouac_zoning, nb_tents = row
            if name_bivouac_zoning not in data:
                data[name_bivouac_zoning] = {}
            data[name_bivouac_zoning][date] = nb_tents
        logger.info(
            "The number of tents by date and bivouac zoning successfully retrieved"
        )
        return JSONResponse(content=jsonable_encoder({"content": data}))
    except sqlalchemy.exc.ProgrammingError:
        logger.critical(
            "Error while retrieving the number of tents by date and bivouac zoning"
        )
        return JSONResponse(
            status_code=400,
            content=jsonable_encoder({"content": "Error while retrieving data"}),
        )


@app.get(
    "/reservations/next-availability/",
    summary="Get the next available bivouac dates by zoning",
    tags=["Data"],
)
async def get_next_available_dates_bivouac_zoning(
    start_date: str,
    db: Session = Depends(get_db),
):
    """Get the next available dates for each bivouac zone.

    - **start_date**: The starting date (YYYY-MM-DD)
    """
    logger.info("get_next_available_dates_bivouac_zoning")
    try:
        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        end_date = start_date + timedelta(days=30)

        query = text(
            """
            -- Générer les dates de start_date à dans un mois pour chaque zone de bivouac
            WITH dates_generees AS (
                SELECT zb.nom AS name_bivouac_zoning, gs.date::DATE
                FROM zonage_bivouac zb
                CROSS JOIN generate_series(:start_date, :end_date, '1 day'::INTERVAL) AS gs(date)
            ),
            -- Calculer les tentes réservées par zone et par date
            tentes_par_date AS (
                SELECT rl.name_bivouac_zoning, rl.date, SUM(r.nb_tents) AS total_tentes_reservees
                FROM reservations r
                JOIN reservations_locations rl ON r.id = rl.reservation
                WHERE rl.date >= :start_date
                GROUP BY rl.name_bivouac_zoning, rl.date
            ),
            -- Trouver les dates disponibles
            dates_disponibles AS (
                SELECT dg.name_bivouac_zoning, dg.date
                FROM dates_generees dg
                LEFT JOIN tentes_par_date tpd
                    ON dg.name_bivouac_zoning = tpd.name_bivouac_zoning
                    AND dg.date = tpd.date
                WHERE tpd.total_tentes_reservees < (
                    SELECT quotas FROM zonage_bivouac zb WHERE zb.nom = dg.name_bivouac_zoning
                ) OR tpd.total_tentes_reservees IS NULL
            ),
            -- Ajouter un numéro de ligne pour filtrer les deux premières dates
            dates_ordonnees AS (
                SELECT name_bivouac_zoning, date,
                    ROW_NUMBER() OVER (PARTITION BY name_bivouac_zoning ORDER BY date) AS row_num
                FROM dates_disponibles
            )
            -- Sélectionner les deux premières dates sous forme de tableau
            SELECT name_bivouac_zoning,
                   ARRAY_AGG(date ORDER BY date) FILTER (WHERE row_num <= 2) AS prochaines_dates_disponibles
            FROM dates_ordonnees
            GROUP BY name_bivouac_zoning;
            """
        )

        params = {"start_date": start_date, "end_date": end_date}
        result = db.execute(query, params)

        data = {row[0]: row[1] for row in result.fetchall()}

        logger.info(
            "The next available dates for each bivouac zoning successfully retrieved"
        )
        return JSONResponse(content=jsonable_encoder({"content": data}))

    except sqlalchemy.exc.ProgrammingError:
        logger.critical(
            "Error while retrieving the next available dates for each bivouac zoning"
        )
        return JSONResponse(
            status_code=400,
            content=jsonable_encoder({"content": "Error while retrieving data"}),
        )


@app.post(
    "/reservations/cancel",
    summary="Cancel a reservation",
    tags=["Data"],
)
async def cancel_reservation(
    request: PostCancelReservation, db: Session = Depends(get_db)
) -> Response:
    """Cancel a reservation

    - **request**: request model
    """
    logger.info("cancel_reservation endpoint")
    uuid_reservation = request.uuid
    email_reservation = request.email

    try:
        query = text(
            """
            SELECT COUNT(*)
            FROM public.reservations
            WHERE uuid = :uuid_reservation AND email = :email_reservation AND annule = false
        """
        )
        params = {
            "uuid_reservation": uuid_reservation,
            "email_reservation": email_reservation,
        }
        result = db.execute(query, params)
        count = result.scalar()

        # No feature found
        if count == 0:
            logger.info("No reservation found with this uuid and this email address.")
            return JSONResponse(
                status_code=404,
                content=jsonable_encoder(
                    {
                        "content": "No reservation found with this uuid and this email address."
                    }
                ),
            )

        # Cancel the reservation
        update_query = text(
            """
            UPDATE public.reservations
            SET annule = true
            WHERE uuid = :uuid_reservation AND email = :email_reservation
        """
        )
        params = {
            "uuid_reservation": uuid_reservation,
            "email_reservation": email_reservation,
        }
        db.execute(update_query, params)
        db.commit()
        return JSONResponse(
            status_code=200,
            content=jsonable_encoder({"content": "Reservation successfully cancelled"}),
        )
    except sqlalchemy.exc.ProgrammingError:
        db.rollback()
        logger.critical("Error while canceling the reservation")
        return JSONResponse(
            status_code=400,
            content=jsonable_encoder({"content": "Error while retrieving data"}),
        )
