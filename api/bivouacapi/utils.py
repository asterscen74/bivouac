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
Voici votre attestation ainsi que toutes les bonnes pratiques à adopter pour une nuit à la belle étoile en réserve naturelle.
Conservez ce document, il vous sera demandé par les gardes de la réserve naturelle.
L'équipe des réserves naturelles de Haute-Savoie vous souhaite une bonne nuit !
Une question ? contact@cen-haute-savoie.org

Hello,
Here is your bivy declaration and a summary of best practices for your time out in the nature reserve.
Please save a copy of this document, as you may be asked to display it to rangers
The Haute Savoie nature reserves team wishes you a pleasant night!
For further information: contact@cen-haute-savoie.org
        """

        message = MIMEMultipart()
        message["Subject"] = "Attestation de bivouac"
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

    # Page 1 - French Part
    pdf.add_page()
    pdf.set_font("Helvetica", size=11)
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
        w=0,
        h=5,
        new_x="LEFT",
        new_y="NEXT",
    )
    pdf.set_font("Helvetica", size=11, style="I")
    pdf.cell(
        w=200,
        h=5,
        text="ENGLISH BELOW",
        markdown=True,
        new_x="LEFT",
        new_y="NEXT",
    )
    pdf.image(
        "static/logo_reserves_naturelles_haute_savoie.png",
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
    pdf.set_font("Helvetica", size=12, style="I")
    pdf.set_text_color(0, 0, 0)
    pdf.cell(
        w=200,
        h=20,
        text="Les bonnes pratiques à adopter pour bivouaquer",
        align="C",
        new_x="LEFT",
        new_y="NEXT",
    )
    pdf.set_font("Helvetica", size=11)
    pdf.multi_cell(
        w=190,
        h=6,
        text="""**Règle n°1 - Fréquentation** - Je laisse le lieu comme je l'ai trouvé. Je ne serai pas le seul à le fréquenter cet été. Profitons-en tous !""",
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
        text="""**Règle n°3 - Bruit** - Merci de respecter la quiétude de la faune sauvage et de vos voisins bivouaqueurs ! Le bruit augmente le stress et modifie le comportement de la faune. Alors respectons leur espace de vie !""",
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
        text="""**Règle n°6 - Déchets et toilettes sauvages** - En montagne, la décomposition des déchets est très lente. Pour éviter à la faune de se nourrir d'aliments inadaptés, remportons tous nos déchets, y compris le papier toilette et les trognons de pomme !""",
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
    pdf.cell(
        w=0,
        h=5,
        new_x="LEFT",
        new_y="NEXT",
    )
    pdf.multi_cell(
        w=190,
        h=6,
        text="""Nouveau ! Bivouac interdit au LAC BLANC""",
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
    pdf.set_font("Helvetica", size=13)
    pdf.multi_cell(
        w=190,
        h=6,
        text="""**Sauvegardez ce document**, il pourra vous être demandé par les gardes des réserves naturelles le jour de votre bivouac.""",
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
        "static/logo_reserves_naturelles_haute_savoie.png",
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
    pdf.set_font("Helvetica", size=12, style="I")
    pdf.set_text_color(0, 0, 0)
    pdf.cell(
        w=200,
        h=20,
        text="Best practices for bivying in the nature reserves of Haute-Savoie",
        align="C",
        new_x="LEFT",
        new_y="NEXT",
    )
    pdf.set_font("Helvetica", size=11)
    pdf.multi_cell(
        w=190,
        h=6,
        text="""**Rule n°1 - Frequentation** - I leave the place as I found it. I will not be the only one visiting this summer. By leaving no trace, I let the others enjoy it as I have.""",
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
        text="""**Rule n°3 - Noise** - Thank you for respecting the quietness of wildlife and other visitors! Noise increases the stress and influences the behavior of wildlife. Being quiet means respecting their living area.""",
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
        text="""**Rule n°6 - Litter and toilets** - In the mountains, waste decays very slowly. To prevent animals from feeding on unsuitable food, do not leave anything up there and take back with you your toilet paper and biodegradable waster!""",
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
        text="""For your own safety, check weather conditions before bivying in the mountains.""",
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
        text="""New! Bivying is forbidden at the LAC BLANC""",
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
    pdf.set_font("Helvetica", size=13)
    pdf.multi_cell(
        w=190,
        h=6,
        text="""**Save this document**, you may have to display it for the rangers in the nature reserves on the day of your bivy.""",
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

    current_datetime = await get_formatted_datetime()
    logger.info("pdf successfully generated")
    return pdf.output(dest="S"), f"reservation_{current_datetime}"
