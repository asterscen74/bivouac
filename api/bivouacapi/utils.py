"""Useful fonctions used in the endpoints"""

from datetime import datetime

from fpdf import FPDF

from bivouacapi.logs import initLogger

logger = initLogger(__name__)


async def get_formatted_datetime():
    """Retrieve current date and time"""
    logger.info("get_formatted_datetime method")
    now = datetime.now()
    formatted_datetime = now.strftime("%d_%m_%y_%H_%M_%S")
    return formatted_datetime


async def generate_pdf(attributes):
    """Generate a pdf

    :param attributes: Informations
    """
    logger.info("generate_pdf method")
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("helvetica", size=12)
    pdf.text(text=f"Nom : {attributes.nom}", x=10, y=10)
    pdf.text(text=f"Prénom : {attributes.prenom}", x=10, y=15)
    pdf.text(text=f"Nombre de places : {attributes.nb_places}", x=10, y=20)
    pdf.image("static/logo_asters_cen.jpeg", x=100, y=0, w=70, h=50)
    current_datetime = await get_formatted_datetime()
    logger.info("pdf successfully generated")
    return pdf.output(dest="S"), f"reservation_{current_datetime}"
