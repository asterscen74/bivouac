# Bivouacapi

API Rest développée avec le framework Python [FastAPI](https://fastapi.tiangolo.com/).

## Création d'un environnement virtuel

L'API a été développée avec la version 3.10 de Python.

```shell
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

## Configuration des variables d'environnement

L'API sur un certain nombre de variables d'environnement qui doivent être configurés avant son lancement.

Sur la base du fichier `.env.sample`, créez un fichier `.env` et modifiez les différentes variables :

- `POSTGRES_USER` : Utilisateur qui va interagir avec la base de données
- `POSTGRES_PASSWORD` : Mot de passé associé à l'utilisateur
- `POSTGRES_DB` : Nom de la base de données
- `POSTGRES_HOST` : Hôte de la base de données
- `POSTGRES_PORT` : Port de la base de données
- `API_FASTAPI_SERVER_HOST` : Hôte de l'API
- `API_FASTAPI_SERVER_PORT` : Port de l'API
- `API_OPENAPI_URL` : Chemin vers le fichier openapi.json
- `API_DOCS_URL` : Chemin vers la documentation Swagger
- `SMTP_PORT` : Port du serveur SMTP
- `SMTP_SERVER` : Adresse du serveur SMTP
- `SMTP_LOGIN` : Identifiant de l'utilisateur
- `SMTP_PASSWORD` : Mot de passe associé à l'utilisateur
- `SMTP_SENDER_EMAIL` : Adresse e-mail de l'expéditeur

## Lancement de l'API

`uvicorn bivouacapi.main:app --reload --port 9010`

## Consultation de la documentation Swagger

- <http://127.0.0.1:9010/>
- <http://127.0.0.1:9010/docs>
