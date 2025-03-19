/**
 * Vue pour afficher les détails d'une recette.
 * Cet objet contient des références aux éléments HTML utilisés pour afficher les informations d'une recette.
 *
 * @property {HTMLElement} image - Élément HTML pour afficher l'image de la recette.
 * @property {HTMLElement} title - Élément HTML pour afficher le titre de la recette.
 * @property {HTMLElement} ingredients - Élément HTML pour afficher la liste des ingrédients.
 * @property {HTMLElement} instructions - Élément HTML pour afficher les étapes de préparation.
 * @property {HTMLElement} cookingTime - Élément HTML pour afficher le temps de cuisson.
 * @property {HTMLElement} difficulty - Élément HTML pour afficher le niveau de difficulté de la recette.
 * @property {HTMLElement} nbPersonnes - Élément HTML pour afficher le nombre de personnes pour la recette.
 */
export const recipeDetailView = {
  image: document.getElementById("recipeImage"),
  title: document.getElementById("recipeTitle"),
  ingredients: document.getElementById("ingredientsList"),
  instructions: document.getElementById("stepsList"),
  categories: document.getElementById("categoriesList"),
};
