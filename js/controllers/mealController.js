import { applyGradientToSteps } from "../functions/color.js";
import { capitalizeWords, stringToArray } from "../functions/str.js";
import { mealView } from "../views/mealView.js";
import { view } from "../views/globalView.js";
import { fetchMealsByType } from "../models/modelApi.js";
import { ingredients } from "./init.js";

const ensureIngredientsLoaded = async () => {
  return new Promise((resolve) => {
    const checkLoaded = () => {
      if (ingredients.length > 0) {
        resolve();
      } else {
        setTimeout(checkLoaded, 50); // Vérifie toutes les 50ms
      }
    };
    checkLoaded();
  });
};

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get("m");

  if (searchValue) {
    await ensureIngredientsLoaded(); // S'assurer que `ingredients` est prêt
    await getRecipeDetails(searchValue);
    applyGradientToSteps();
    if (getLike()) {
      mealView.btnLike.classList.add("liked");
    }
  }
};

const getRecipeDetails = async (mealName) => {
  try {
    const meals = await fetchMealsByType(mealName, "meal");

    if (!meals || meals.length === 0) {
      console.error("Aucune recette trouvée !");
      mealView.displayError("Aucune recette trouvée.");
      return;
    }

    const meal = meals.filter((m) => m.strMeal === mealName)[0];
    view.title(meal.strMeal);

    // Extraction des ingrédients et quantités
    let ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientName = meal[`strIngredient${i}`]?.trim();
      const measure = meal[`strMeasure${i}`]?.trim();

      if (ingredientName) {
        const formattedName = capitalizeWords(ingredientName);
        const ingredient = ingredients.find(
          (ing) => ing.getName().toLowerCase() === formattedName.toLowerCase()
        );

        ingredientsList.push({
          measure: measure || "",
          name: ingredient ? ingredient.getName() : formattedName, // Ajout du nom si pas trouvé
          image: ingredient ? ingredient.getSmall() : "", // Image vide si introuvable
        });
      }
    }

    // Gestion des catégories
    const categories = meal.strTags ? stringToArray(meal.strTags) : [];

    // Transformation des instructions en étapes claires
    const instructions = meal.strInstructions
      ? meal.strInstructions
          .split(/\r\n|\n|\.\s|\d+\.\s?|step\s\d+\s?:?/i)
          .map((step) => step.trim())
          .filter((step) => step !== "" && step !== step.toUpperCase())
      : [];

    // Mise à jour de l'affichage
    mealView.displayImage(meal.strMealThumb);
    mealView.displayTitle(meal.strMeal);
    mealView.displayIngredients(ingredientsList);
    mealView.displayInstructions(instructions);
    mealView.displayCategories(categories);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la recette :",
      error
    );
  }
};

const getLike = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get("m");

  if (searchValue) {
    const likes = JSON.parse(localStorage.getItem("likes")) || [];
    return likes.includes(searchValue);
  }
};

mealView.btnBack.addEventListener("click", () => {
  window.history.back();
});

const addLike = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get("m");

  if (!searchValue) return; // Vérifie que searchValue est valide

  let likes = JSON.parse(localStorage.getItem("likes")) || [];
  if (likes.includes(searchValue)) {
    likes = likes.filter((item) => item !== searchValue);
    mealView.btnLike.classList.remove("liked");
  } else {
    likes.unshift(searchValue);
    mealView.btnLike.classList.add("liked");
  }

  localStorage.setItem("likes", JSON.stringify(likes)); // Met à jour le localStorage
};

mealView.btnLike.addEventListener("click", addLike);
