# Bivouac

Ce projet a pour objectif de créer une plateforme de réservation de Bivouac en Haute-Savoie.

## Installation & Configuration

L'application s'appuie sur un certain nombre de variables d'environnement.

Vous devez créer un fichier `.env` sur la base du fichier `.env.sample`.

Dans ce fichier, sont définies les variables suivantes :

- `GIT_AUTHOR_NAME` : Prénom et nom de l'utilisateur Gitlab.
- `GIT_AUTHOR_EMAIL` : Adresse e-mail de l'utilisateur Gitlab.
- `GITLAB_REPO` : Adresse du répertoire Gitlab.
- `GITLAB_REPO_TOKEN_USER` : Nom de l'access token qui permettra le clône du répertoire.
- `GITLAB_REPO_TOKEN_PASSWORD` : Mot de passe associé à l'access token.
- `POSTGRES_VERSION` : Version PostgreSQL
- `POSTGRES_USER` : Nom d'utilisateur qui va intéragir avec la base de données
- `POSTGRES_PASSWORD` : Mot de passé associé à l'utilisateur
- `POSTGRES_DB` : Nom de la base de données
- `POSTGRES_HOST` : Adresse de la base de données
- `POSTGRES_PORT` : Port utilisé par la base de données
- `API_FLASK_SERVER_HOST` : Adresse de l'API
- `API_FLASK_SERVER_PORT` : Port de l'API lorsqu'elle est lancée en mode production
- `API_OPENAPI_URL` : Chemin vers le fichier openapi.json
- `API_DOCS_URL` : Chemin vers la documentation Swagger
- `FRONT_PORT` : Port utilisé par l'application React
- `SMTP_PORT` : Port du serveur SMTP
- `SMTP_SERVER` : Adresse du serveur SMTP
- `SMTP_LOGIN` : Identifiant de l'utilisateur
- `SMTP_PASSWORD` : Mot de passe associé à l'utilisateur
- `SMTP_SENDER_EMAIL` : Adresse e-mail de l'expéditeur

Afin de garantir une qualité entre les différentes contributions, une série de _git hooks_ (à travers l'outil [pre-commit](https://pre-commit.com/)) est disponible.

Il est fortement recommandé de travailler dans un environnement virtuel :

`python3 -m venv .venv`

Activation de l'environnement :
`. .venv/bin/activate`

Installation des prérequis :
`python -m pip install -U -r requirements.txt`

Installation des git hooks :

```bash
pre-commit install
```

Seront installés les hooks suivants :

- [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli)
- [ruff](https://github.com/charliermarsh/ruff-pre-commit)
- [black](https://github.com/psf/black)
- [isort](https://github.com/pycqa/isort)
- [flake8](https://github.com/pycqa/flake8)
- [mirrors-eslint](https://github.com/pre-commit/mirrors-eslint)

## Lancement de l'application

Pour lancer le backend, référez-vous au fichier [README](./api/README.md).

Pour lancer le frontend, référez-vous au fichier [README](./front/README.md).

## Déploiement Ansible sur un serveur distant

```shell
cd ansible
```

Le groupe `bivouac_remote` est présent dans le fichier `ansible/hosts`. Il utiliser le fichier de variables `bivouac_remote.cen74.com.yml`. Il faut également disposer d'une configuration SSH fonctionnelle nommée `bivouac_remote.cen74.com` pour pouvoir se connecter au serveur distant.

Exemple de configuration SSH (`~/.ssh/config`):

```ini
Host bivouac_remote.cen74.com
    HostName 51.75.125.103
    Port 22
    User ubuntu
    IdentityFile /home/vincent/.ssh/bivouac_cen74
```

Pour tester la connexion au serveur distant, on peut utiliser la commande suivante:

```shell
ansible bivouac_remote -m ping -i hosts
```

Pour pouvoir déployer un rôle en particulier (exemple avec front. le mot de passe vault est dans le pass sous la clé **ansible_vault_password**):

```shell
ansible-playbook --inventory hosts --limit bivouac_remote --tags front -v playbook.yml --ask-vault-pass
```

## Diverses commandes de debug

```shell
sudo service supervisor status
sudo service supervisor restart
sudo supervisorctl status all
sudo journalctl -u supervisor.service -n 100 -f
sudo supervisorctl restart fastapi-bivouacapi
cat /tmp/logs/supervisor-bivouacapi-stdout.txt
cat /tmp/logs/supervisor-bivouacapi-stderr.txt
sudo apt-get --purge autoremove supervisor
```
