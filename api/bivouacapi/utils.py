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
        Merci d'avoir déclaré votre réservation de bivouac.
        Vous trouverez ci-joint une synthèse de votre réservation.
        Bon bivouac !
        """

        message = MIMEMultipart()
        message["Subject"] = "Bivouac : synthèse de votre réservation"
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
    pdf.add_page()
    pdf.set_font("helvetica", size=12)
    pdf.text(text=f"Date : {attributes.date}", x=10, y=10)
    pdf.text(text=f"Nombre de tentes : {attributes.nb_tents}", x=10, y=15)
    pdf.text(text=f"Nombre de personnes : {attributes.nb_people}", x=10, y=20)
    pdf.text(text=f"Email : {attributes.email}", x=10, y=25)
    pdf.image("static/logo_asters_cen.jpeg", x=100, y=0, w=70, h=50)
    current_datetime = await get_formatted_datetime()
    logger.info("pdf successfully generated")
    return pdf.output(dest="S"), f"reservation_{current_datetime}"
