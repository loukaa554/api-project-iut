/**
 * Module `view` pour gérer l'affichage des recettes dans l'interface utilisateur.
 */
export const view = {
  body: document.body,

  // Référence à l'élément d'entrée pour saisir un ingrédient.
  search: document.getElementById("search"),
  searchRandomBtn: document.getElementById("searchRandomBtn"),

  // Référence au suggestions
  suggestions: document.getElementById("suggestions"),
  firstSuggestion: document.getElementById("firstSuggestion"),
  suggestion: document.getElementsByClassName("item-suggest"),

  // Référence recherche
  results: document.getElementById("results"),
  ingredient: document.getElementById("ingredient"),
  ingredientName: document.getElementById("ingredientName"),
  ingredientImage: document.getElementById("ingredientImage"),
  ingredientDescription: document.getElementById("ingredientDescription"),

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
  displayRecipes(recipes) {
    // Réinitialise le contenu du conteneur des recettes.
    this.recipesContainer.innerHTML = "";

    // Si aucune recette n'est trouvée, affiche un message d'erreur.
    if (recipes.length === 0) {
      this.recipesContainer.innerHTML = "<p>Aucune recette trouvée.</p>";
      return;
    }

    // Parcourt chaque recette et crée une carte pour l'afficher.
    recipes.forEach((meal) => {
      // Crée un élément div pour représenter une carte de recette.
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");

      // Définit le contenu HTML de la carte avec l'image, le titre et un lien vers la recette.
      recipeCard.innerHTML = `
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                <h3>${meal.strMeal}</h3>
                                <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">Voir la recette</a>
                        `;

      // Ajoute la carte au conteneur des recettes.
      this.recipesContainer.appendChild(recipeCard);
    });
  },
};
