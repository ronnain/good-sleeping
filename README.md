# Sleeping

## Deployment

Run in cmd:
`ng build`

copier le répertorie dist pour remplacer le répertoire `sleeping-prod` du server à la racine.

Puis copier tout le contenu du dossier browser sauf !!!!! `index.html` !!! dans `public_html` (attention à ne pas supprimer la `sitemap.xml`, `robot.txt` et `htaccess`)

relancer l'application node (obligatoire), rechercher Node.js dans CPANEL

# TODO
surement supprimer les fichiers qui sont dans le public html comme ``.html`` et `articles.html` et dans `articles/`
