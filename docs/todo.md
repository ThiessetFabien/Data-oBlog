# API O'blog

## Conception
    [x] MCD
    [x] Appliquer les règles de transformation

## Squitch
    [] Sous dossier migrations
    [] Regex en validation de données dans la BDD

## Environnement de développement
    [] architecture de cadex
    [] routes organisées
    [] Gestion d'erreurs
    [] Debug et logs d'erreurs


## Données de la BDD
    [] import ad hoc (pont entre JSON & SQL)
        [] script "./data/import.js"
        [] Récupérer les données du fichier json
        [] Faire table rase des données déjà dans la base
        [] Boucler sur les données
        [] Pour chaque données exécuter une requête d'insertion SQL
    [] Charger les données de "./data"

## Routes
    [] GET /posts => affiche des articles
    [] POST /categoris => affiche des catégories d'articles

    [] GET /posts/:id => affiche un article avec l'id (nombre)
    [] POST /posts => créer un article avec validation des données
    [] GET /posts/category/:id => affiche une catégorie d'articles avec validation

## Bonus
    [] Documentation de l'API avec JSDOC
    [] Documentation de l'API avec Swagger
    [] Liens sur la page d'accueil vers ces documentations

## Super Bonus
    [] Les routes complètes du tableau
    [] JOI sur les routes POST/PATCH
