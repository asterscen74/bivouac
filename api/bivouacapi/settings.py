"""Settings file with global variables"""

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings

from bivouacapi.__init__ import __version__


class Settings(BaseSettings):  # pylint: disable=too-few-public-methods
    APP_NAME: str = Field(default="Bivouac API", validation_alias="APP_NAME")
    DEBUG: bool = Field(default=True, validation_alias="DEBUG")
    PROJECT_VERSION: str = Field(
        default=__version__, validation_alias="PROJECT_VERSION"
    )
    POSTGRES_USER: str = Field(..., validation_alias="POSTGRES_USER")
    POSTGRES_PASSWORD: str = Field(..., validation_alias="POSTGRES_PASSWORD")
    POSTGRES_DB: str = Field(..., validation_alias="POSTGRES_DB")
    POSTGRES_HOST: str = Field(..., validation_alias="POSTGRES_HOST")
    POSTGRES_PORT: str = Field(..., validation_alias="POSTGRES_PORT")
    API_FASTAPI_SERVER_HOST: str = Field(
        ..., validation_alias="API_FASTAPI_SERVER_HOST"
    )
    API_FASTAPI_SERVER_PORT: str = Field(
        ..., validation_alias="API_FASTAPI_SERVER_PORT"
    )


@lru_cache
def get_settings() -> Settings:
    return Settings(".env")


settings = get_settings()
