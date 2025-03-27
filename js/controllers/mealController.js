/**
 * Importation des modules et services nécessaires pour le contrôleur des repas.
 */
import { applyGradientToSteps } from "../functions/color.js";
import { capitalizeWords, stringToArray } from "../functions/str.js";
import { mealView } from "../views/mealView.js";
import { view } from "../views/globalView.js";
import { fetchMealsByType } from "../models/modelApi.js";
import { ingredients } from "../services/dataService.js";

/**
 * Classe MealController : Gère l'affichage des détails d'un repas et les interactions utilisateur.
 */
export class MealController {
  constructor() {
    this.setupEventListeners();
    this.loadRecipeOnPageLoad();
  }

  /**
   * Vérifie si les ingrédients sont chargés avant de poursuivre.
   * @returns {Promise<void>} - Une promesse résolue une fois les ingrédients chargés.
   */
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

  /**
   * Récupère les détails d'une recette à partir de son nom et met à jour l'affichage.
   * @param {string} mealName - Le nom du repas à récupérer.
   */
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
            .split(/\r\n|\n|\.\s|\d+\.\s?|step\s\d+\s?:?/i) // Regex pour diviser les instructions
            .map((step) => step.trim()) // Supprime les espaces inutiles
            .filter((step) => step !== "" && step !== step.toUpperCase()) // Filtre les étapes vides et celles en majuscules
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

  /**
   * Vérifie si un repas est aimé en fonction des données stockées dans localStorage.
   * @returns {boolean} - True si le repas est dans la liste des favoris, sinon false.
   */
  getLike() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get("m");
    if (searchValue) {
      const likes = JSON.parse(localStorage.getItem("likes")) || [];
      return likes.includes(searchValue);
    }
  }

  /**
   * Ajoute ou supprime un repas des favoris.
   */
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

  /**
   * Ajoute les écouteurs d'événements pour la navigation et l'ajout aux favoris.
   */
  setupEventListeners() {
    mealView.btnBack.addEventListener("click", () => {
      window.history.back();
    });
    mealView.btnLike.addEventListener("click", () => this.addLike());
  }

  /**
   * Charge automatiquement une recette si un paramètre est présent dans l'URL.
   */
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
