# Bivouac front

Front développée avec le framework JavaScript [React](https://react.dev/).

## Installation de l'environnement

L'application a été développée avec la version **10.2.4** de [npm](https://www.npmjs.com/).

```shell
npm install
```

## Lancement de l'application

Pour le bon fonctionnement de l'application, l'**API** doit être lancée en parallèle (chargement des données).
Vous pouvez vous réferer au [README](../api/README.md).

Le fichier `src/settings-server.js` doit être créé à partir du fichier `settings-server.js.sample`.
Ce fichier contient 3 variables :

- **api_port**: port de l'API REST. La valeur par défaut est `9005`. Cette valeur sera utilisée si la variable d'environnement `REACT_APP_API_FASTAPI_SERVER_PORT` n'a pas été définie.
- **api_host**: hôte de l'API REST. La valeur par défaut est `localhost`. Cette valeur sera utilisée si la variable d'environnement `REACT_APP_API_FASTAPI_SERVER_HOST` n'a pas été définie.
- **api_url** : adresse de l'API REST. La valeur par défaut `http://localhost:9005/`.

Vous pouvez lancer l'application en mode développement avec la commande :

```shell
npm run dev
```

Vous pouvez builder l'application et la déployer avec les commandes suivantes :

```shell
npm run build
npm install -g serve
serve -s build
```
