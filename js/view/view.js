/**
 * Module `view` pour gérer l'affichage des recettes dans l'interface utilisateur.
 */
export const view = {
  body: document.body,

  // Référence à l'élément de nav.
  nav: document.getElementById("nav"),
  iconResp: document.getElementById("iconResp"),

  // Référence à l'élément d'entrée pour saisir un ingrédient.
  search: document.getElementById("search"),
  searchRandomBtn: document.getElementById("searchRandomBtn"),

  // Référence au suggestions
  suggestions: document.getElementById("suggestions"),
  firstSuggestion: document.getElementById("firstSuggestion"),
  suggestion: document.getElementsByClassName("item-suggest"),
  noResults: document.getElementById("noResults"),
  noResultsSuggest: document.getElementById("noResultsSuggest"),

  // Référence recherche
  results: document.getElementById("results"),
  ingredient: document.getElementById("ingredient"),
  ingredientName: document.getElementById("ingredientName"),
  ingredientImage: document.getElementById("ingredientImage"),
  ingredientDescription: document.getElementById("ingredientDescription"),
  ingredients: document.getElementById("ingredients"),

  // Référence au conteneur où les recettes seront affichées.
  recipesContainer: document.getElementById("recipes"),

  // Référence au Footer
  footerDate: document.getElementById("footerDate"),

  /**
   * Affiche les recettes dans le conteneur prévu à cet effet.
   *
   * @param {Array} recipes - Tableau contenant les objets des recettes à afficher.
   * Chaque objet doit contenir les propriétés `strMeal`, `strMealThumb` et `idMeal`.
   */

  displaySuggestions: (suggestions) => {
    view.suggestions.innerHTML = suggestions;
    view.suggestions.classList.toggle("active", suggestions.length > 0);
  },

  displayResults: (results) => {
    view.results.innerHTML = results;
  },

  displayIngredient: (ingredient) => {
    view.ingredient.style.display = "flex";
    view.ingredientDescription.innerText = ingredient.getDescription();
    view.ingredientName.innerText = ingredient.getName();
    view.ingredientImage.src = ingredient.getMedium();
  },
};
