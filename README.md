# Articles API

Cette API (Backend) permet de gérer des articles avec des fonctionnalités CRUD, de recherche avancée et de filtrage.

## Installation et démarrage

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Configurer les variables d'environnement (`.env`) avec l'URI MongoDB :
   ```
   MONGODB_URI=votre_uri_mongodb
   PORT=3000
   ```

3. Démarrer le serveur :
   ```bash
   npm start
   ```
   (Ou `npm run dev` pour démarrer avec nodemon).

## Documentation Swagger

La documentation complète (Swagger) est disponible sur la route :  
**`http://localhost:3000/api-docs`**

## Endpoints Principaux

### 1. Créer un article
- **Endpoint:** `POST /api/articles`
- **Body:** JSON avec `title`, `content`, `author`, `categorie`, `tags` (tableau).
- **Exemple:**
  ```json
  {
    "title": "Introduction à Node.js",
    "content": "Découvrez comment utiliser Node.js...",
    "author": "Alice",
    "categorie": "Tech",
    "tags": ["Node.js", "Backend"]
  }
  ```

### 2. Lire les articles (avec ou sans filtre)
- **Endpoint:** `GET /api/articles`
- **Filtres optionnels (Query) :** `categorie`, `author`, `date`
- **Exemple:** `GET /api/articles?categorie=Tech&date=2026-03-18`

### 3. Lire un article spécifique
- **Endpoint:** `GET /api/articles/:id`
- **Exemple:** `GET /api/articles/65e9a3b2f...`

### 4. Modifier un article
- **Endpoint:** `PUT /api/articles/:id`
- **Body:** JSON avec les champs à modifier (`title`, `content`, `categorie`, `tags`...)

### 5. Rechercher un article
- **Endpoint:** `GET /api/articles/search?query=texte_a_rechercher`
- **Description:** Recherche les articles dont le titre ou le contenu correspond à la requête.

### 6. Supprimer un article
- **Endpoint:** `DELETE /api/articles/:id`
