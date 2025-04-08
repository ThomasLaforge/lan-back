# Projet initial pour vos exercices d'algorithmie en typescript

## Installation

1. Clonez le projet
2. Déplacez vous dans le dossier cloné
3. installez les dépendances avec la commande `npm install` 
4. Créez un fichier `.env` à la racine du projet
```
PORT=1992
SALT_ROUNDS=10
JWT_SECRET=topsecret
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password
```
5. Setup BDD
  - `npx prisma db push` pour créer la base de données
  - `npx prisma db seed` pour ajouter des données de test
6. Lancez le projet avec la commande `npm start`