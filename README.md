# 🍽️ Projet de Recherche de Recettes

Bienvenue dans ce projet de recherche de recettes qui permet aux utilisateurs de découvrir des plats à partir d'ingrédients, de catégories ou de régions spécifiques. Ce projet utilise l'API [TheMealDB](https://www.themealdb.com/) pour récupérer des informations sur les recettes et offre une interface intuitive pour explorer différentes cuisines du monde.

## 📖 Table des matières

- [Introduction](#-projet-de-recherche-de-recettes)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Architecture du Projet](#-architecture-du-projet)
- [API Utilisée](#-api-utilisée)
- [Fonctionnalités Principales](#-fonctionnalités-principales)
- [Contributions](#-contributions)
- [Licence](#-licence)

---

## 💻 Installation

### Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Un navigateur web (Chrome, Firefox, Edge...)
- Un éditeur de code (VS Code, Sublime Text...)
- Un serveur local (optionnel, comme Live Server pour VS Code)

### Étapes d'installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-utilisateur/projet-recettes.git
   ```
2. **Accéder au projet**
   ```bash
   cd projet-recettes
   ```
3. **Ouvrir le projet dans un navigateur**
   - Double-cliquez sur `index.html`
   - **OU** servez le projet avec un serveur local pour éviter les problèmes de CORS
   - **OU** ouvrez le projet avec une extension Live Server (VS Code)

---

## 🚀 Utilisation

### Navigation dans l'application

1. **Recherche de recettes** :
   - Utilisez la barre de recherche pour entrer le nom d'un plat ou d'un ingrédient.
   - Consultez les résultats affichés dynamiquement.
2. **Affichage des détails d'une recette** :
   - Cliquez sur une recette pour voir ses détails : ingrédients, instructions, image, etc.
3. **Explorer par catégories et ingrédients** :
   - Parcourez les différentes catégories et ingrédients pour découvrir de nouvelles recettes.
4. **Sauvegarde des favoris** :
   - Ajoutez des recettes en favoris pour y accéder facilement plus tard.

### Fonctionnalités clés

- 🔍 **Recherche intelligente** : recherche par nom, ingrédient ou spécialité.
- 📖 **Détails complets** : instructions de préparation, image, tags et catégories.
- ❤️ **Favoris** : possibilité d'ajouter des recettes préférées.
- 🍽️ **Exploration** : découvrez de nouvelles recettes par catégories et ingrédients.
- 🌙 **Dark Mode** : basculez entre le mode clair et sombre.
- 🎨 **Interface moderne et réactive**.

---

## 📂 Structure du projet

L'architecture du projet suit le modèle **MVC (Modèle-Vue-Contrôleur)**. Ce modèle permet de séparer la logique métier (Modèle), l'interface utilisateur (Vue), et la gestion des événements (Contrôleur). Voici l'organisation des fichiers du projet :

```plaintext
├── README.md                        # Documentation du projet
├── assets                           # Ressources du projet (images, icônes, polices, etc.)
│   ├── css                          # Fichiers CSS pour la mise en forme
│   │   ├── footer.css               # Styles pour le footer
│   │   ├── nav.css                  # Styles pour la navigation
│   │   ├── reset.css                # Reset CSS pour réinitialiser les styles par défaut des navigateurs
│   │   ├── root.css                 # Styles de base pour le projet
│   │   └── search.css               # Styles pour la page de recherche
│   ├── favicon                      # Icônes de favicons
│   ├── fonts                        # Polices utilisées dans le projet
│   │   ├── Evolventa-Bold.ttf       # Police bold
│   │   └── Loukaaa-font-text.ttf    # Police text
├── index.html                       # Page d'accueil du projet
├── js                               # Scripts JavaScript du projet
│   ├── controllers                  # Contrôleurs (logique métier)
│   │   ├── globalController.js      # Contrôleur principal de gestion globale
│   │   ├── init.js                  # Initialisation du projet
│   │   ├── mealController.js        # Contrôleur de gestion des recettes
│   │   └── searchController.js      # Contrôleur de recherche
│   ├── functions                    # Fonctions utilitaires utilisées dans le projet
│   │   ├── catString.js             # Fonction pour la gestion des catégories
│   │   ├── color.js                 # Fonction de gestion des couleurs
│   │   ├── flags.js                 # Fonction de gestion des drapeaux (probablement pour les pays ou régions)
│   │   └── str.js                   # Fonction pour la gestion des chaînes de caractères
│   ├── models                       # Modèles pour la gestion des données
│   │   ├── modelApi.js              # Gestion des appels API
│   │   ├── modelArea.js             # Modèle pour les spécialités
│   │   ├── modelCategorie.js        # Modèle pour les catégories de recettes
│   │   ├── modelIngredient.js       # Modèle pour les ingrédients
│   │   └── modelRecipe.js           # Modèle pour les recettes
│   ├── utils                        # Utilitaires divers
│   │   └── icons.js                 # Gestion des icônes
│   └── views                        # Vues pour l'affichage des données
│       ├── globalView.js            # Vue principale de l'application
│       ├── mealView.js              # Vue pour l'affichage des recettes
│       └── searchView.js            # Vue pour la page de recherche
├── meal                             # Dossier pour la page spécifique aux recettes
│   ├── index.html                   # Page de détail de la recette
│   └── style.css                    # Styles spécifiques à la page de recette
├── search                           # Dossier pour la page spécifique à la recherche
│   ├── index.html                   # Page de recherche
│   └── style.css                    # Styles spécifiques à la page de recherche
├── site.webmanifest                 # Manifest pour la configuration du site web
└── style.css                        # Fichier CSS global
```

### Détails de l'architecture

1. **Contrôleurs (`controllers`)** :

   - Les contrôleurs sont responsables de la gestion de la logique de l'application. Par exemple :
     - `globalController.js` gère les aspects globaux du projet.
     - `mealController.js` s'occupe des interactions avec les recettes.
     - `searchController.js` est responsable de la logique de la recherche.

2. **Modèles (`models`)** :

   - Les modèles contiennent la logique de gestion des données.
     - `modelApi.js` gère les appels à l'API pour récupérer les données.
     - `modelArea.js`, `modelCategorie.js`, `modelIngredient.js`, et `modelRecipe.js` contiennent les classes et la logique associée à chaque type de donnée (spécialité, catégorie, ingrédient, recette).

3. **Vues (`views`)** :

   - Les vues sont responsables de l'affichage des données.
     - `globalView.js` est la vue principale.
     - `mealView.js` est utilisée pour afficher les détails des recettes.
     - `searchView.js` s'occupe de l'affichage des résultats de recherche.

4. **Fonctions utilitaires (`functions`)** :

   - Ce dossier contient des fonctions utilitaires réutilisables dans tout le projet, comme la gestion des chaînes de caractères, des couleurs, des catégories, etc.

5. **Fichiers CSS** :

   - Contient les fichiers CSS pour la mise en forme de l'application, divisés par composants (footer, navigation, recherche, etc.).

6. **Dossier `assets`** :
   - Contient les ressources comme les icônes, polices et images utilisées dans le projet.

---

## 🌐 API utilisée

Ce projet utilise l'API **TheMealDB** pour récupérer les informations sur les recettes, les ingrédients, les catégories, etc.

### TheMealDB

L'API **TheMealDB** est une base de données gratuite en ligne qui fournit des informations sur des recettes de cuisine, des ingrédients, des catégories de plats et bien plus encore. Elle permet de rechercher des recettes par nom, catégorie ou ingrédient.

#### Points importants :

- **Endpoint principal** : `https://www.themealdb.com/api/json/v1/1/`
- **Documentation** : [TheMealDB API Documentation](https://www.themealdb.com/api.php)

#### Endpoints utilisés dans ce projet :

1. **Recherche par nom de recette**

   - **URL** : `/search.php?s=<meal_name>`
   - **Description** : Permet de rechercher une recette par son nom.
   - **Exemple** : `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`

2. **Recherche par catégorie**

   - **URL** : `/filter.php?c=<category>`
   - **Description** : Permet de rechercher des recettes par catégorie.
   - **Exemple** : `https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken`

3. **Recherche par spécialité**

   - **URL** : `/filter.php?a=<specialité>`
   - **Description** : Permet de rechercher des recettes par spécialité.
   - **Exemple** : `https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian`

4. **Recherche par ingrédient**

   - **URL** : `/filter.php?i=<ingredient>`
   - **Description** : Permet de rechercher des recettes par ingrédient.
   - **Exemple** : `https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken`

5. **Détails d'une recette**
   - **URL** : `/lookup.php?i=<meal_id>`
   - **Description** : Permet d'obtenir les détails d'une recette spécifique en utilisant son identifiant.
   - **Exemple** : `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`

#### Limitations de l'API :

- **Limitation des requêtes** : L'API impose un nombre limité de requêtes par minute pour éviter les abus.
- **Données** : Les informations sont fournies par les contributeurs de l'API et peuvent ne pas être exhaustives ou mises à jour en temps réel.

### Comment l'API est utilisée dans le projet :

1. **Recherche de recettes** : Lorsque l'utilisateur recherche une recette, une requête est envoyée à l'API pour récupérer les résultats en fonction du nom de la recette, de la catégorie ou de l'ingrédient.
2. **Affichage des détails** : Lorsqu'un utilisateur sélectionne une recette, une requête est envoyée pour obtenir les informations détaillées de la recette, y compris les ingrédients, les instructions et l'image du plat.
3. **Filtrage par catégories ou ingrédients** : L'utilisateur peut explorer des recettes par catégorie ou ingrédient en filtrant les résultats via l'API.

---

## ⚙️ Fonctionnalités Principales

L'application de recherche de recettes offre plusieurs fonctionnalités pour améliorer l'expérience utilisateur et faciliter la découverte de nouvelles recettes.

### 1. **Recherche de recettes par nom, ingrédient, spécialité ou catégorie**

- Utilisez la barre de recherche pour rechercher des recettes par nom, ingrédient ou catégorie.
- L'application récupère les résultats en temps réel via l'API **TheMealDB** et affiche une liste de recettes correspondantes.
- Exemple : Si vous tapez "Chicken", vous obtiendrez toutes les recettes contenant du poulet.

### 2. **Affichage des détails d'une recette**

- Lorsqu'un utilisateur sélectionne une recette, l'application affiche les détails de cette recette, y compris :
  - **Ingrédients** : Liste des ingrédients avec leurs quantités.
  - **Instructions** : Étapes détaillées pour la préparation du plat.
  - **Image** : Image du plat pour visualiser le résultat final.
  - **Catégories** : Catégories auxquelles appartient la recette (par exemple, "Plat principal", "Végétarien").

### 3. **Exploration par catégories et ingrédients**

- L'utilisateur peut explorer les recettes en fonction de différentes catégories (par exemple, "Vegetarian", "Chicken", etc.) ou ingrédients.
- Cette fonctionnalité permet de découvrir des recettes selon les préférences culinaires ou les ingrédients disponibles.
- L'utilisateur peut cliquer sur une catégorie ou un ingrédient pour voir toutes les recettes associées.

### 4. **Ajout aux favoris**

- Les utilisateurs peuvent ajouter leurs recettes préférées à une liste de favoris.
- Cette fonctionnalité permet de retrouver facilement les recettes aimées sans avoir à effectuer une nouvelle recherche.

### 5. **Interface moderne et réactive**

- L'application est conçue pour être responsive, garantissant une expérience optimale sur différents appareils (ordinateurs, tablettes, smartphones).
- L'interface utilisateur est moderne et facile à utiliser, avec des éléments visuels attractifs comme les images de plats.
- Un mode sombre est disponible pour une expérience visuelle plus confortable.

### 6. **Filtrage et tri des résultats**

- L'application propose des options de filtrage pour affiner les résultats de recherche en fonction de critères spécifiques (type de plat, difficulté, ingrédients).
- Les utilisateurs peuvent trier les résultats en fonction de leurs préférences.

### 7. **Navigation fluide et intuitive**

- La navigation dans l'application est fluide et intuitive, permettant aux utilisateurs de passer facilement d'une section à l'autre (recherche, résultats, détails, etc.).
- Un bouton de retour permet de revenir à la page précédente sans perdre la recherche ou les filtres appliqués.

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Que vous soyez un développeur expérimenté ou un débutant, vous pouvez aider à améliorer ce projet. Voici quelques étapes pour commencer à contribuer :

### 1. **Forker le dépôt**

- Cliquez sur le bouton **Fork** en haut à droite de ce dépôt pour créer une copie personnelle du projet.

### 2. **Cloner votre fork**

- Clonez votre fork localement sur votre machine :
  ```bash
  git clone https://github.com/loukaa554/api-project-iut.git
  ```

### 3. **Créer une branche pour votre fonctionnalité ou correction**

- Avant d'apporter des modifications, créez une nouvelle branche pour la fonctionnalité ou la correction de bug que vous souhaitez apporter :
  ```bash
  git checkout -b ma-nouvelle-fonctionnalité
  ```

### 4. **Faire vos modifications**

- Apportez les modifications nécessaires au code ou à la documentation.
- N'oubliez pas d'ajouter des tests si cela est pertinent pour votre modification.

### 5. **Committez vos changements**

- Une fois vos modifications effectuées, enregistrez-les avec un message de commit clair :
  ```bash
  git commit -m "Ajout de [fonctionnalité] ou correction de [bug]"
  ```

### 6. **Pousser vos modifications**

- Poussez vos modifications vers votre fork sur GitHub :
  ```bash
  git push origin ma-nouvelle-fonctionnalité
  ```

### 7. **Soumettre une pull request**

- Allez sur la page de votre fork sur GitHub et cliquez sur le bouton **Pull Request** pour soumettre vos modifications.
- Décrivez clairement les changements effectués et pourquoi ils sont nécessaires.

### 8. **Participer à la revue de code**

- Une fois votre pull request ouverte, les mainteneurs du projet l'examineront. Si tout est en ordre, vos modifications seront fusionnées avec le projet principal.

### 9. **Respecter les bonnes pratiques**

- Veuillez respecter les bonnes pratiques de codage, utiliser un formatage cohérent et fournir des commentaires de code clairs.
- Assurez-vous que votre code est fonctionnel et qu'il passe les tests existants avant de soumettre une pull request.

### 10. **Suggestions et améliorations**

- Si vous avez des idées pour améliorer l'application, n'hésitez pas à les partager via des issues ou des pull requests.

---

## 📝 Licence

Ce projet est sous la licence **MIT**.

### Détails de la licence

- Vous êtes libre d'utiliser, de modifier et de distribuer ce code, sous réserve des conditions de la licence MIT.
- Ce projet est fourni **"tel quel"**, sans aucune garantie d'aucune sorte, expresse ou implicite, y compris, mais sans s'y limiter, les garanties implicites de qualité marchande ou d'adéquation à un usage particulier.
