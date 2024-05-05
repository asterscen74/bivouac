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
            content=jsonable_encoder({"content": "Error while retrieving data"})
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
    nb_tents_reservation = request.nb_tents
    nb_people_reservation = request.nb_people
    email_reservation = request.email
    fr_or_foreign_reservation = request.fr_or_foreign
    department_reservation = request.department
    itinerance_reservation = request.itinerance
    locations_reservation = request.locations

    check_locations = await check_locations_argument(locations_reservation)
    if check_locations.status_code == 400:
        return check_locations

    multipoint_locations_geom = "MULTIPOINT("
    for location in locations_reservation:
        multipoint_locations_geom += f"({location[1]} {location[0]}),"
    multipoint_locations_geom = multipoint_locations_geom[:-1] + ")"

    query = f"""
        INSERT INTO public.reservations(date,nb_tents,nb_people,email,fr_or_foreign,department,itinerance,geom)
        VALUES('{date_reservation}',{nb_tents_reservation},{nb_people_reservation},'{email_reservation}','{fr_or_foreign_reservation}',
        '{department_reservation}','{itinerance_reservation}', ST_GeomFromText('{multipoint_locations_geom}'))
        RETURNING id
        """
    try:
        print(text(query))
        result = db.execute(text(query))
        reservation_number = result.fetchone()[0]
        db.commit()
        logger.info(f"Reservation {reservation_number} successfully registered")

        # Send summary by e-mail
        if send_summary:
            query = f"""SELECT date, nb_tents, nb_people, email, fr_or_foreign, department, itinerance
            FROM public.reservations
            WHERE id = {reservation_number}
            """
            result = db.execute(text(query)).mappings().one()
            pdf_content, _pdf_name = await generate_pdf(attributes=result)

            result = await send_summary_mail(result.email, BytesIO(pdf_content))
            return result
    except sqlalchemy.exc.ProgrammingError:
        db.rollback()
        logger.critical("Error during registration")
        return JSONResponse(
            content=jsonable_encoder({"content": "Error during registration"})
        )


@app.get(
    "/pdf/",
    summary="Get a pdf of the reservation",
    tags=["Tools"],
)
async def generate_send_pdf(
    reservation_number: int,
    db: Session = Depends(get_db),
):
    """Generate the reservation pdf

    - **reservation_number**: Reservation number
    """
    logger.info("generate_send_pdf endpoint")
    try:
        query = f"""SELECT date, nb_tents, nb_people, email, fr_or_foreign, department, itinerance
            FROM public.reservations
            WHERE id = {reservation_number}
            """
        result = db.execute(text(query)).mappings().one()
        pdf_content, pdf_name = await generate_pdf(attributes=result)
        # Method 1 : PDF in memory
        buffer = BytesIO(pdf_content)
        headers = {"Content-Disposition": f'attachment; filename="{pdf_name}.pdf"'}
        return Response(
            buffer.getvalue(),
            headers=headers,
            media_type="application/pdf",
        )
        # # Method 2 : PDF on the disk
        # from fastapi.responses import FileResponse
        # return FileResponse(
        #     path="hello_world.pdf", filename="", media_type="application/pdf"
        # )
    except sqlalchemy.exc.ProgrammingError:
        return JSONResponse(
            content=jsonable_encoder({"content": "Error while retrieving data"})
        )
