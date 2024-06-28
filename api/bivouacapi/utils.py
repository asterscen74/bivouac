"""Useful fonctions used in the endpoints"""

import smtplib
from datetime import datetime
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fpdf import FPDF

from bivouacapi.logs import initLogger
from bivouacapi.settings import settings

logger = initLogger(__name__)


async def get_formatted_datetime():
    """Retrieve current date and time"""
    logger.info("get_formatted_datetime method")
    now = datetime.now()
    formatted_datetime = now.strftime("%d_%m_%y_%H_%M_%S")
    return formatted_datetime


async def check_locations_argument(locations: list[list[float]]):
    """Check the format of the locations argument. Each list must contain 2 elements"""
    logger.info("check_locations method")
    for location in locations:
        if len(location) != 2:
            logger.critical(
                "Error on the locations argument. Each list must contain 2 elements"
            )
            return JSONResponse(
                status_code=400,
                content=jsonable_encoder(
                    {
                        "content": "Error on the locations argument. Each list must contain 2 elements"
                    }
                ),
            )
    logger.info("locations argument is valid")
    return JSONResponse(
        status_code=200,
        content=jsonable_encoder({"content": "locations argument is valid"}),
    )


async def send_summary_mail(receiver_email, pdf_attachment):
    """Send the summary of the reservation by e-mail"""
    logger.info("send_summary_mail method")
    try:
        # SMTP configuration
        port = settings.SMTP_PORT
        smtp_server = settings.SMTP_SERVER
        login = settings.SMTP_LOGIN
        password = settings.SMTP_PASSWORD
        sender_email = settings.SMTP_SENDER_EMAIL
        receiver_email = receiver_email

        text = """
Bonjour,
Voici votre réservation en pièce jointe ainsi que toutes les bonnes pratiques à adopter pour une nuit à la belle étoile en réserve naturelle.
Conservez ce document, il vous sera demandé par les gardes de la réserve naturelle.
L'équipe des réserves naturelles de Haute-Savoie vous souhaite une bonne nuit !
Une question ? bivouac@cen-haute-savoie.org

Hello,
Here is your bivouac registration and a summary of best practices for your time out in the nature reserve.
Please save a copy of this document, as you may be asked to display it to rangers
The Haute Savoie nature reserves team wishes you a pleasant night!
For further information: bivouac@cen-haute-savoie.org
        """

        message = MIMEMultipart()
        message["Subject"] = "Votre réservation de bivouac en réserve naturelle"
        message["From"] = sender_email
        message["To"] = receiver_email
        message.attach(MIMEText(text, "plain"))

        # Add pdf summary
        attachment = MIMEBase("application", "octet-stream")
        attachment.set_payload(pdf_attachment.getvalue())
        encoders.encode_base64(attachment)
        attachment.add_header(
            "Content-Disposition", "attachment", filename="reservation_bivouac.pdf"
        )
        message.attach(attachment)

        # Send the email
        with smtplib.SMTP(smtp_server, port) as server:
            server.starttls()
            server.login(login, password)
            server.sendmail(sender_email, receiver_email, message.as_string())
            server.quit()
            logger.info(
                "The summary of the declaration has been successfully sent by e-mail"
            )
            return JSONResponse(
                status_code=200,
                content=jsonable_encoder(
                    {
                        "content": "The summary of the declaration has been successfully sent by e-mail"
                    }
                ),
            )
    except:
        logger.critical(
            "An error was encountered when sending the summary of the declaration by e-mail"
        )
        return JSONResponse(
            status_code=400,
            content=jsonable_encoder(
                {
                    "content": "An error was encountered when sending the summary of the declaration by e-mail"
                }
            ),
        )


async def generate_pdf(attributes):
    """Generate a pdf

    :param attributes: Informations
    """
    logger.info("generate_pdf method")
    pdf = FPDF()

    for i, commune in enumerate(attributes.communes.split(",")):
        reserve = attributes.reserves.split(",")[i]

        # Page 1 - French Part
        pdf.add_page()
        pdf.set_font("Helvetica", size=10)

        pdf.cell(
            w=200,
            h=5,
            text=f"{attributes.email}",
            markdown=True,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=200,
            h=5,
            text=f"{attributes.date}",
            markdown=True,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=200,
            h=5,
            text=f"Nombre de personnes : {attributes.nb_people}",
            markdown=True,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=200,
            h=5,
            text=f"Localisation : {reserve}",
            markdown=True,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.set_font("Helvetica", size=10, style="I")
        pdf.cell(
            w=200,
            h=5,
            text="ENGLISH BELOW",
            markdown=True,
            new_x="LEFT",
            new_y="NEXT",
        )

        logo = "static/logo_reserves_naturelles_haute_savoie.png"
        if commune == "Chamonix":
            logo = "static/logo_reserve_aiguilles_rouges.jpg"
        if commune == "Les Contamines-Montjoie":
            logo = "static/logo_reserve_contamines.jpg"
        if commune == "Sixt":
            logo = "static/logo_reserve_sixt_fer_a_cheval.jpg"

        pdf.image(
            logo,
            x=75,
            w=70,
            h=25,
            keep_aspect_ratio=True,
        )

        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.set_font("Helvetica", size=16)
        pdf.set_text_color(39, 78, 19)
        pdf.cell(
            w=200,
            h=5,
            text="**Une nuit à la belle étoile en réserve naturelle**",
            markdown=True,
            align="C",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.set_font("Helvetica", size=11, style="I")
        pdf.set_text_color(0, 0, 0)
        pdf.cell(
            w=200,
            h=15,
            text="Les bonnes pratiques à adopter pour bivouaquer",
            align="C",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.set_font("Helvetica", size=10)

        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Sauvegardez ce document**, il vous sera demandé par les gardes des réserves naturelles le jour de votre bivouac.""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )

        pdf.set_text_color(255, 0, 0)
        alert_text = ""
        if commune == "Chamonix":
            alert_text = """Le bivouac est réglementé du 1er juillet au 31 Août par arrêté préfectoral."""
        if commune == "Les Contamines-Montjoie":
            alert_text = """**Zone interdite Plan Jovet et Lacs Jovet pour les Contamines-Montjoie**
Afin de préserver les milieux naturels, le **bivouac** est interdit sur cette zone du 1er juillet au 31 Août.
La **baignade** et la navigation est interdite aux randonneurs et aux animaux de compagnie tout au long de l'année.
            """
        pdf.multi_cell(
            w=190,
            h=6,
            text=alert_text,
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.set_text_color(0, 0, 0)

        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Règle n°1 - Respect des sentiers et des lieux** - Je préserve la végétation fragile et évite l'érosion des sols en restant sur le sentier principal sans modifier l'environnement. Je ne serai pas le seul.e à fréquenter les sentiers cet été. Profitons-en tous !""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Règle n°2 - Horaires** - Le camping est interdit dans les réserves naturelles. Seul le bivouac est toléré pour une seule nuit, avec ou sans abri, entre 19h et 9h.""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Règle n°3 - Bruit** - Je respecte la quiétude de la faune sauvage et de mes voisins bivouaqueurs ! Le bruit augmente le stress et modifie le comportement de la faune. Alors je respecte l'espace de vie des animaux qui m'entourent !""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Règle n°4 - Feu** - Pour limiter le risque incendie, les atteintes à la flore et le dérangement de la faune, il est interdit de faire du feu. Seuls les réchauds sont tolérés.""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Règle n°5 - Point d'eau** - Les lacs d'altitude sont des écosystèmes sensibles aux apports extérieurs (crème solaire, dentifrice...). Ne rien y tremper, c'est les préserver !""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Règle n°6 - Déchets et toilettes sauvages** - En montagne, la décomposition des déchets est très lente. Pour éviter la présence de déchets et le risque d'ingestion d'aliments inadaptés pour la faune, remportons tous nos déchets, y compris le papier toilette et les trognons de pomme !""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.multi_cell(
            w=190,
            h=6,
            text="""Pour votre sécurité, renseignez-vous sur les conditions météorologiques avant de prévoir un bivouac en montagne.""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.image(
            "static/logo_asters_cen.jpeg",
            x=75,
            w=70,
            h=38,
            keep_aspect_ratio=True,
        )

        # Page 2 - English Part
        pdf.add_page()
        pdf.image(
            logo,
            x=75,
            w=70,
            h=25,
            keep_aspect_ratio=True,
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.set_font("Helvetica", size=16)
        pdf.set_text_color(39, 78, 19)
        pdf.cell(
            w=200,
            h=5,
            text="**A night under the stars in the nature reserve**",
            markdown=True,
            align="C",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.set_font("Helvetica", size=11, style="I")
        pdf.set_text_color(0, 0, 0)
        pdf.cell(
            w=200,
            h=15,
            text="Best practices for bivying in the nature reserves of Haute-Savoie",
            align="C",
            new_x="LEFT",
            new_y="NEXT",
        )

        pdf.set_text_color(255, 0, 0)
        alert_text = ""
        if commune == "Chamonix":
            alert_text = """Bivouac is regulated from July 1 to August 31 by prefectoral decree."""
        if commune == "Les Contamines-Montjoie":
            alert_text = """**Prohibited zone Plan Jovet and Lacs Jovet for Contamines-Montjoie**
In order to preserve natural environments, **bivouac** is prohibited in this area from July 1 to August 31.
**Swimming** in the Jovet Lakes is prohibited for hikers and pets throughout the year.
            """
        pdf.multi_cell(
            w=190,
            h=6,
            text=alert_text,
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.set_text_color(0, 0, 0)

        pdf.set_font("Helvetica", size=10)
        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Rule n°1 - Respecting trails and places** - I preserve fragile vegetation and avoid soil erosion by staying on the main trail without altering the environment. I won't be the only one out on the trails this summer. Let's all make the most of it!""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Rule n°2 - Time window** - Camping is forbidden is the nature reserves. Only bivying is tolerated for one night at a time, with or without a shelter, between 7pm and 9am.""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Rule n°3 - Noise** - Thank you for respecting the quietness of wildlife and other visitors! Noise increases the
            stress and influences the behavior of wildlife. Being quiet means respecting their living area.""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Rule n°4 - Fire** - To reduce risks of wildfires, damages to flora and disturbance of fauna, it is forbidden to light a fire. Stoves are tolerated.""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Rule n°5 - Water** - Altitude lakes are sensitive ecosystems to any alien input (sunscreen, toothpaste...). Do not deep anything in them to help protect them !""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.multi_cell(
            w=190,
            h=6,
            text="""**Rule n°6 - Litter and toilets** - Waste and unauthorized toilets - In the mountains, waste decomposes very slowly. To prevent wildlife from feeding on unsuitable food, take all your garbage with you, including toilet paper and apple cores!""",
            markdown=True,
            align="L",
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.cell(
            w=0,
            h=5,
            new_x="LEFT",
            new_y="NEXT",
        )
        pdf.set_font("Helvetica", size=13)
        pdf.image(
            "static/logo_asters_cen.jpeg",
            x=75,
            w=70,
            h=38,
            keep_aspect_ratio=True,
        )

    current_datetime = await get_formatted_datetime()
    logger.info("pdf successfully generated")
    return pdf.output(dest="S"), f"reservation_{current_datetime}"
