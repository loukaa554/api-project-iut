import { splitString, stringToArray } from "../functions/str.js";
import { fetchMealsByType, fetchMealDescription } from "../models/modelApi.js";
import { searchView } from "../views/searchView.js";
import { view } from "../views/globalView.js";
import { ingredients } from "../services/dataService.js";

/**
 * Contrôleur pour gérer la recherche des recettes et des ingrédients.
 */
export class SearchController {
  constructor() {
    this.handleSearch();
  }

  /**
   * Gère l'initialisation de la recherche en fonction des paramètres de l'URL.
   */
  async handleSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get("q")?.toLowerCase().trim();
    const type = urlParams.get("type") || "all";

    view.title(`Recherche ${searchValue}`);
    view.search.value = urlParams.get("q");

    if (searchValue) {
      this.performSearch(searchValue, type);
    } else if (type === "like") {
      this.likeSearch();
    }
  }

  /**
   * Effectue une recherche de recettes ou d'ingrédients selon le type spécifié.
   * @param {string} searchValue - Terme de recherche saisi par l'utilisateur.
   * @param {string} type - Type de recherche ("meal", "ingredient", "all").
   */
  async performSearch(searchValue, type) {
    let allResults = [];
    try {
      const mealsData = await fetchMealsByType(searchValue, type);
      allResults = await Promise.all(
        mealsData.map(async (meal) => ({
          name: meal.strMeal,
          type: "meal",
          image: meal.strMealThumb,
          tags: meal.strTags ? stringToArray(meal.strTags) : [],
          description:
            meal.strInstructions || (await fetchMealDescription(meal.strMeal)),
        }))
      );
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }

    // Charger les ingrédients de manière asynchrone
    const ingredientsPromise = new Promise(async (resolve) => {
      while (!ingredients || ingredients.length === 0) {
        await new Promise((r) => setTimeout(r, 100));
      }
      resolve();
    });

    await ingredientsPromise;

    // Tri des résultats prioritaires
    if (type === "all" || type === "ingredient") {
      allResults.sort((a, b) =>
        a.name.startsWith(searchValue)
          ? -1
          : b.name.startsWith(searchValue)
          ? 1
          : 0
      );
    }

    // Gestion des ingrédients
    let filteredIngredients = [];
    if (type === "all") {
      filteredIngredients = ingredients.filter((ing) =>
        ing.getName().toLowerCase().includes(searchValue)
      );
    }

    if (filteredIngredients.length > 0) {
      searchView.ingredients.style.display = "flex";
      searchView.displayIngredients(filteredIngredients);
    }

    if (type === "ingredient") {
      const foundIngredient = ingredients.find(
        (i) => i.getName().toLowerCase() === searchValue
      );
      searchView.displayIngredient(foundIngredient);
    }

    // Affichage des résultats ou suggestions
    if (allResults.length === 0) {
      const suggest = splitString(searchValue);
      searchView.displayNoResultsSuggestions(suggest, searchValue);
    } else {
      searchView.displaySearchResults(allResults);
    }
  }

  /**
   * Recherche et affiche les favoris de l'utilisateur.
   */
  async likeSearch() {
    const likes = JSON.parse(localStorage.getItem("likes")) || [];

    // Vérifie si aucun favori n'est trouvé
    if (likes.length === 0) {
      searchView.displayNoResultsMessage("Aucun favori trouvé.");
      return;
    }

    try {
      const allResults = (
        await Promise.all(
          likes.map(async (name) => {
            const meals = await fetchMealsByType(name, "meal");
            const meal = meals.filter((m) => m.strMeal === name);
            if (meal.length === 0) return;
            return {
              name: meal[0].strMeal,
              type: "meal",
              image: meal[0].strMealThumb || "",
              tags: meal[0].strTags ? stringToArray(meal[0].strTags) : [],
              description:
                meal[0].strInstructions ||
                (await fetchMealDescription(meal[0].strMeal)),
            };
          })
        )
      ).filter(Boolean); // Supprime les résultats `null`

      // Affiche un message si aucun favori n'est trouvé
      if (allResults.length === 0) {
        searchView.displayNoResultsMessage("Aucun favori trouvé.");
      } else {
        searchView.displaySearchResults(allResults);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des favoris :", error);
      searchView.displayNoResultsMessage("Une erreur est survenue.");
    }
  }
}
