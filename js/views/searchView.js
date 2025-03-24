/**
 * Module `view` pour gérer l'affichage des recettes dans l'interface utilisateur.
 */
import { truncateText } from "../functions/str.js";
import { defaultIcon } from "../utils/icons.js";

export const searchView = {
  // Éléments pour afficher un message en cas de résultats non trouvés
  noResults: document.getElementById("noResults"),
  noResultsText: document.getElementById("noResultsText"),
  noResultsSuggest: document.getElementById("noResultsSuggest"),

  // Élément pour afficher un message spécifique aux favoris non trouvés
  noResultsMessageFavorite: document.getElementById("noResultsMessageFavorite"),

  // Conteneurs pour les résultats et les ingrédients
  results: document.getElementById("results"),
  ingredient: document.getElementById("ingredient"),
  ingredientName: document.getElementById("ingredientName"),
  ingredientImage: document.getElementById("ingredientImage"),
  ingredientDescription: document.getElementById("ingredientDescription"),
  ingredients: document.getElementById("ingredients"),

  // Conteneur pour les recettes
  recipesContainer: document.getElementById("recipes"),

  // Affiche les détails d'un ingrédient
  displayIngredient: (ingredient) => {
    searchView.ingredient.style.display = "flex";
    searchView.ingredientDescription.innerText = ingredient.getDescription();
    searchView.ingredientName.innerText = ingredient.getName();
    searchView.ingredientImage.src = ingredient.getMedium();
  },

  // Affiche une liste d'ingrédients
  displayIngredients: (ingredients) => {
    if (!ingredients || ingredients.length === 0) {
      searchView.ingredients.style.display = "none";
      return;
    }

    searchView.ingredients.style.display = "flex";
    searchView.ingredients.innerHTML = ingredients
      .slice(0, 20)
      .map(
        (ing) => `
        <a class="item" href="/search/?q=${ing.getName()}&type=ingredient">
          <img src="${ing.getSmall()}" alt="${ing.getName()}" />
          <span>${ing.getName()}</span>
        </a>
      `
      )
      .join("");
  },

  // Affiche des suggestions en cas de résultats non trouvés
  displayNoResultsSuggestions: (suggestions, searchValue) => {
    searchView.noResults.style.display = "block";
    searchView.noResultsText.innerText = `"${searchValue}"`;
    if (!suggestions || suggestions.length === 0) {
      searchView.noResultsSuggest.innerHTML = "";
      return;
    }

    searchView.noResultsSuggest.innerHTML = suggestions
      .map((s) => `<a href="/search/?q=${s}&type=all">${s}</a>`)
      .join(", ");
  },

  // Affiche les résultats de recherche
  displaySearchResults: (results) => {
    if (!results || results.length === 0) {
      searchView.results.innerHTML = "";
      return;
    }

    searchView.results.innerHTML = results
      .map(
        (item) => `
        <a href="/meal/?m=${encodeURIComponent(item.name)}" class="item">
          <div class="left">
            <div>
              <h3>${item.name}</h3>
              <div class='tags'>
              ${
                item.tags
                  ? item.tags
                      .map((tag) => `<span class="info tag">${tag}</span>`)
                      .join("")
                  : ""
              }
              </div>
            </div>
            <p>${truncateText(item.description, 200) || ""}</p>
          </div>
          <div class="right">
            <img src="${item.image || defaultIcon}" alt="${item.name}" />
          </div>
        </a>
      `
      )
      .join("");
  },

  // Affiche un message en cas d'absence de favoris
  displayNoResultsMessage: () => {
    searchView.noResultsMessageFavorite.style.display = "block";
    searchView.noResultsMessageFavorite.innerHTML = `Aucun favori trouvé...`;
  },
};
