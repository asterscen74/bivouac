"""Main module"""

from io import BytesIO

import sqlalchemy
from fastapi import Depends, FastAPI, Query, Response
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy.sql import text

from bivouacapi.logs import initLogger
from bivouacapi.models import PostReservation
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
    itinerance_reservation = request.itinerance
    locations_reservation = request.locations
    quizz_note_reservation = request.quizz_note
    if quizz_note_reservation:
        comment = quizz_note_reservation.replace("'", " ")
    else:
        comment = None
    nb_tents_reservation = 1

    check_locations = await check_locations_argument(locations_reservation)
    if check_locations.status_code == 400:
        return check_locations

    try:
        query = f"""
            INSERT INTO public.reservations(nb_tents,nb_people,email,fr_or_foreign,department,itinerance,quizz_note)
            VALUES({nb_tents_reservation},{nb_people_reservation},'{email}','{fr_or_foreign_reservation}',
            '{department}','{itinerance_reservation}', '{comment}' )
            RETURNING id
            """
        result = db.execute(text(query))
        reservation_number = result.fetchone()[0]
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

    queries = []
    for nb, location in enumerate(locations_reservation):
        location_geom = f"POINT({location[1]} {location[0]})"
        query = f"""
            INSERT INTO public.reservations_locations(reservation,date,geom)
            VALUES('{reservation_number}', '{date_reservation}'::date + INTERVAL '{nb} DAY',ST_GeomFromText('{location_geom}'))
            """
        queries.append(query)

    try:
        for query in queries:
            print(text(query))
            result = db.execute(text(query))
            db.commit()
        logger.info(f"Reservation {reservation_number} successfully registered")

        # Send summary by e-mail
        if send_summary:
            query = f"""With s as (
                SELECT rl.date::text as date, nb_people, email,
                    zb.commune, rl.name_bivouac_zoning, r.id
                FROM public.reservations r
                join public.reservations_locations rl on rl.reservation = r.id
                join public.zonage_bivouac zb on zb.nom = rl.name_bivouac_zoning
                WHERE r.id = {reservation_number}
                order by date
            )
            SELECT string_agg(s.date::text, ',') as date, nb_people, email,
                    string_agg(s.commune, ',') as communes
                    ,string_agg(s.name_bivouac_zoning, ',') as reserves
            FROM s
            group by id, nb_people, email
            """
            result = db.execute(text(query)).mappings().one()
            pdf_content, _pdf_name = await generate_pdf(attributes=result)

            result = await send_summary_mail(result.email, BytesIO(pdf_content))
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
    itinerance: bool,
    db: Session = Depends(get_db),
):
    """Get the number of tents by date and bivouac zoning

    - **start_date**: starting date
    - **fields**: reservation with itinerance or not
    """
    logger.info("get_number_tents_date_bivouac_zoning")
    try:

        if itinerance:
            query_where_part = f"""WHERE date BETWEEN '{start_date}'::date
            AND '{start_date}'::date + INTERVAL '2 DAY'"""
        else:
            query_where_part = f"WHERE date = '{start_date}'::date"

        query = f"""
                SELECT loc.date, loc.name_bivouac_zoning,
                SUM(reservations.nb_tents) AS nb_tents
                FROM reservations_locations AS loc
                LEFT JOIN reservations
                ON loc.reservation = reservations.id
                {query_where_part}
                GROUP BY loc.date, loc.name_bivouac_zoning
                ORDER BY loc.date
            """

        result = db.execute(text(query))

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
