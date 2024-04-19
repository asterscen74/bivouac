"""Settings file with global variables"""

from enum import Enum
from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from bivouacapi.__init__ import __version__


class Settings(BaseSettings):  # pylint: disable=too-few-public-methods
    APP_NAME: str = Field(default="Bivouac API", validation_alias="APP_NAME")
    DEBUG: bool = Field(default=True, validation_alias="DEBUG")
    PROJECT_VERSION: str = Field(
        default=__version__, validation_alias="PROJECT_VERSION"
    )
    ROOT_PATH: str = Field(default="", validation_alias="ROOT_PATH")
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
    openapi_url: str = Field(
        default="/docs/openapi.json", validation_alias="API_OPENAPI_URL"
    )
    docs_url: str = Field(default="/docs", validation_alias="API_DOCS_URL")

    model_config = SettingsConfigDict(env_file=".env")


@lru_cache
def get_settings() -> Settings:
    return Settings(".env")


settings = get_settings()

# Static variables
SQLALCHEMY_DATABASE_URL = f"""postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"""
engine = create_engine(SQLALCHEMY_DATABASE_URL)
session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
MAP_LAYERS_ENUM = Enum(
    "map_layers_enum",
    [
        ("aires_de_protection", "aires_de_protection"),
        ("zonage_bivouac", "zonage_bivouac"),
        ("reservations", "reservations"),
    ],
)
