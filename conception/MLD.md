post (
    id              -- identifiant entier généré automatiquement
    slug            -- chaine de caractères limité (regex) : pas d'espaces, de majuscule, de chiffre
    excerpt         -- chaine de caractères limité à 255
    content         -- chaine de caractères non-limité
    category        -- chaine de caractères limité à 255
    category_id     -- clé étrangère qui pointe vers le champ categroy.id (clé primaire)
)

category (
    id              -- identifiant entier généré automatiquement
    route           -- chaine de caractères limité (regex) : pas d'espace, de majuscule, de chiffre
    label           -- chaine de caractères limité à 25
    post_id     -- clé étrangère qui pointe vers le champ article.id (clé primaire)
)
