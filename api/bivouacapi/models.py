"""Models used in the endpoints"""

from pydantic import BaseModel


class PostReservation(BaseModel):
    """
    Parameters to create reservation
    """

    nom: str
    prenom: str
    nb_places: int
    lon: float
    lat: float
