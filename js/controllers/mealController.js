import { applyGradientToSteps } from "../functions/color.js";
import { capitalizeWords, stringToArray } from "../functions/str.js";
import { mealView } from "../views/mealView.js";
import { view } from "../views/globalView.js";
import { fetchMealsByType } from "../models/modelApi.js";
import { ingredients } from "../services/dataService.js";

export class MealController {
  constructor() {
    this.setupEventListeners();
    this.loadRecipeOnPageLoad();
  }

  async ensureIngredientsLoaded() {
    return new Promise((resolve) => {
      const checkLoaded = () => {
        if (ingredients.length > 0) {
          resolve();
        } else {
          setTimeout(checkLoaded, 50);
        }
      };
      checkLoaded();
    });
  }

  async getRecipeDetails(mealName) {
    try {
      const meals = await fetchMealsByType(mealName, "meal");

      if (!meals || meals.length === 0) {
        console.error("Aucune recette trouvée !");
        mealView.displayError("Aucune recette trouvée.");
        return;
      }

      const meal = meals.find((m) => m.strMeal === mealName);
      view.title(meal.strMeal);

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
            name: ingredient ? ingredient.getName() : formattedName,
            image: ingredient ? ingredient.getSmall() : "",
          });
        }
      }

      const categories = meal.strTags ? stringToArray(meal.strTags) : [];

      const instructions = meal.strInstructions
        ? meal.strInstructions
            .split(/\r\n|\n|\.\s|\d+\.\s?|step\s\d+\s?:?/i)
            .map((step) => step.trim())
            .filter((step) => step !== "" && step !== step.toUpperCase())
        : [];

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
  }

  getLike() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get("m");
    if (searchValue) {
      const likes = JSON.parse(localStorage.getItem("likes")) || [];
      return likes.includes(searchValue);
    }
  }

  addLike() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get("m");
    if (!searchValue) return;

    let likes = JSON.parse(localStorage.getItem("likes")) || [];
    if (likes.includes(searchValue)) {
      likes = likes.filter((item) => item !== searchValue);
      mealView.btnLike.classList.remove("liked");
    } else {
      likes.unshift(searchValue);
      mealView.btnLike.classList.add("liked");
    }
    localStorage.setItem("likes", JSON.stringify(likes));
  }

  setupEventListeners() {
    mealView.btnBack.addEventListener("click", () => {
      window.history.back();
    });
    mealView.btnLike.addEventListener("click", () => this.addLike());
  }

  loadRecipeOnPageLoad() {
    window.onload = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const searchValue = urlParams.get("m");

      if (searchValue) {
        await this.ensureIngredientsLoaded();
        await this.getRecipeDetails(searchValue);
        applyGradientToSteps();
        if (this.getLike()) {
          mealView.btnLike.classList.add("liked");
        }
      }
    };
  }
}
