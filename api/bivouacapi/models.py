"""Models used in the endpoints"""

from datetime import date
from typing import List, Optional

from pydantic import BaseModel


class PostReservation(BaseModel):
    """
    Parameters to create reservation
    """

    date: date
    nb_tents: int
    nb_people: int
    email: str
    fr_or_foreign: str
    department: Optional[str] = None
    itinerance: bool
    locations: List[List[float]]
