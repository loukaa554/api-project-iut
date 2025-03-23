import { splitString, stringToArray } from "../functions/str.js";
import { fetchMealsByType, fetchMealDescription } from "../models/modelApi.js";
import { searchView } from "../views/searchView.js";
import { view } from "../views/globalView.js";
import { ingredients } from "./init.js";

export const handleSearch = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get("q")?.toLowerCase().trim();
  const type = urlParams.get("type") || "all";

  view.title(`Recherche ${searchValue}`);
  view.search.value = urlParams.get("q");

  if (searchValue) {
    performSearch(searchValue, type);
  } else if (type === "like") {
    likeSearch();
  }
};

const performSearch = async (searchValue, type) => {
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

  // Tri des résultats prioritaires
  if (type === "all" && type === "ingredient") {
    allResults.sort((a, b) =>
      a.name.startsWith(searchValue)
        ? -1
        : b.name.startsWith(searchValue)
        ? 1
        : 0
    );
  }

  // Affichage des ingrédients
  let filteredIngredients = [];
  if (type === "all") {
    filteredIngredients = ingredients.filter((ing) =>
      ing.getName().toLowerCase().includes(searchValue)
    );
  }

  if (type === "ingredient") {
    const foundIngredient = ingredients.find(
      (i) => i.getName().toLowerCase() === searchValue
    );
    searchView.displayIngredient(foundIngredient);
  }

  if (filteredIngredients.length > 0) {
    searchView.ingredients.style.display = "flex";
    searchView.displayIngredients(filteredIngredients);
  }

  // Affichage des résultats ou suggestions
  if (allResults.length === 0) {
    const suggest = splitString(searchValue);
    searchView.displayNoResultsSuggestions(suggest, searchValue);
  } else {
    searchView.displaySearchResults(allResults);
  }
};

const likeSearch = async () => {
  const likes = JSON.parse(localStorage.getItem("likes")) || [];

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

    if (allResults.length === 0) {
      searchView.displayNoResultsMessage("Aucun favori trouvé.");
    } else {
      searchView.displaySearchResults(allResults);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des favoris :", error);
    searchView.displayNoResultsMessage("Une erreur est survenue.");
  }
};

// Exécuter la recherche au chargement de la page
window.onload = handleSearch;
