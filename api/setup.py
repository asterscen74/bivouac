"""
Définition des dépendances de versions et des métadonnées du package bivouacapi
"""

from pathlib import Path

from setuptools import find_packages, setup

with open(Path(Path(__file__).parent, "README.md"), encoding="utf-8") as reader:
    long_description = reader.read()

about = {}
with open(
    Path(Path(__file__).parent, "bivouacapi", "__init__.py"), encoding="utf-8"
) as reader:
    exec(reader.read(), about)

setup(
    name=about["__project__"],
    version=about["__version__"],
    description=about["__doc__"],
    packages=find_packages(exclude=["docs"]),
    include_package_data=True,
    python_requires="<4.0.0",
    install_requires=[
        "fastapi==0.110.2",
        "pydantic==2.7.0",
        "pydantic-settings==2.2.1",
        "sqlalchemy==2.0.29",
        "uvicorn==0.29.0",
        "psycopg2==2.9.9",
        "fpdf2==2.7.8",
    ],
    extras_require={
        "dev": [
            "pytest==7.1.2",
            "pytest-cov==3.0.0",
            "black==22.3.0",
            "pylint==2.14.3",
            "isort==5.10.1",
        ],
    },
    long_description=long_description,
    long_description_content_type="text/markdown",
    url=about["__url__"],
    author=about["__author__"],
    author_email=about["__author_email__"],
    maintainer=about["__maintainer__"],
    license=about["__copyright__"],
    project_urls={
        "Company": about["__company_website__"],
    },
)
