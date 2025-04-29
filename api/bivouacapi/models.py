"""Models used in the endpoints"""

from datetime import date
from typing import List, Optional

from pydantic import BaseModel


class PostReservation(BaseModel):
    """
    Parameters to create reservation
    """

    date: date
    nb_people: int
    email: str
    fr_or_foreign: str
    department: Optional[str] = None
    tmb: bool
    locations: List[List[float]]
    quizz_note: Optional[str] = None


class PostCancelReservation(BaseModel):
    """
    Parameters to cancel reservation
    """

    uuid: str
    email: str
