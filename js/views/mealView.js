/**
 * Vue pour afficher les détails d'une recette.
 * Cet objet contient des références aux éléments HTML utilisés pour afficher les informations d'une recette.
 *
 * @property {HTMLElement} image - Élément HTML pour afficher l'image de la recette.
 * @property {HTMLElement} title - Élément HTML pour afficher le titre de la recette.
 * @property {HTMLElement} ingredients - Élément HTML pour afficher la liste des ingrédients.
 * @property {HTMLElement} instructions - Élément HTML pour afficher les étapes de préparation.
 * @property {HTMLElement} categories - Élément HTML pour afficher les catégories de la recette.
 * @property {HTMLElement} btnBack - Bouton HTML pour revenir à la page précédente.
 * @property {HTMLElement} btnLike - Bouton HTML pour aimer la recette.
 */
export const mealView = {
  image: document.getElementById("recipeImage"), // Référence à l'élément HTML pour l'image de la recette.
  title: document.getElementById("recipeTitle"), // Référence à l'élément HTML pour le titre de la recette.
  ingredients: document.getElementById("ingredientsList"), // Référence à l'élément HTML pour la liste des ingrédients.
  instructions: document.getElementById("stepsList"), // Référence à l'élément HTML pour les étapes de préparation.
  categories: document.getElementById("categoriesList"), // Référence à l'élément HTML pour les catégories de la recette.

  btnBack: document.getElementById("btnBack"), // Référence au bouton pour revenir en arrière.
  btnLike: document.getElementById("btnLike"), // Référence au bouton pour aimer la recette.

  /**
   * Affiche l'image de la recette.
   * @param {string} imageUrl - URL de l'image à afficher.
   */
  displayImage(imageUrl) {
    this.image.src = imageUrl || ""; // Définit la source de l'image ou une chaîne vide si aucune URL n'est fournie.
  },

  /**
   * Affiche le titre de la recette.
   * @param {string} title - Titre de la recette.
   */
  displayTitle(title) {
    this.title.textContent = title || "Nom inconnu"; // Définit le texte du titre ou "Nom inconnu" si aucun titre n'est fourni.
  },

  /**
   * Affiche la liste des ingrédients.
   * @param {Array} ingredientsList - Liste des ingrédients avec leurs images, noms et mesures.
   */
  displayIngredients(ingredientsList) {
    this.ingredients.innerHTML = ingredientsList
      .map(
        (i) => `
          <li class="ingredient">
            <img src="${i.image}" alt="${i.name}"/> <!-- Image de l'ingrédient -->
            <div class="right">
              <p>${i.name}</p> <!-- Nom de l'ingrédient -->
              <p class="measure">${i.measure}</p> <!-- Mesure de l'ingrédient -->
            </div>
          </li>`
      )
      .join(""); // Génère le HTML pour chaque ingrédient et l'insère dans la liste.
  },

  /**
   * Affiche les étapes de préparation.
   * @param {Array} instructions - Liste des étapes de préparation.
   */
  displayInstructions(instructions) {
    this.instructions.innerHTML = instructions
      .map(
        (i, index) => `
        <div class="step">
          <div class="circle">${index + 1}</div> <!-- Numéro de l'étape -->
          <p>${i}</p> <!-- Description de l'étape -->
        </div>`
      )
      .join(""); // Génère le HTML pour chaque étape et l'insère dans la liste.
  },

  /**
   * Affiche les catégories de la recette.
   * @param {Array} categories - Liste des catégories.
   */
  displayCategories(categories) {
    this.categories.innerHTML = categories
      .map((i) => `<li class="info">${i}</li>`) // Génère le HTML pour chaque catégorie.
      .join(""); // Insère les catégories dans la liste.
  },
};
