import { applyGradientToSteps } from "../functions/color.js";
import { capitalizeWords, stringToArray } from "../functions/str.js";
import { mealView } from "../views/mealView.js";
import { view } from "../views/globalView.js";
import { fetchMealsByType } from "../models/modelApi.js";
import { ingredients } from "./init.js";

// Fonction pour s'assurer que les ingrédients sont chargés avant de continuer
const ensureIngredientsLoaded = async () => {
  return new Promise((resolve) => {
    const checkLoaded = () => {
      if (ingredients.length > 0) {
        resolve(); // Résout la promesse si les ingrédients sont chargés
      } else {
        setTimeout(checkLoaded, 50); // Vérifie toutes les 50ms
      }
    };
    checkLoaded();
  });
};

// Fonction exécutée au chargement de la fenêtre
window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get("m"); // Récupère la valeur du paramètre "m" dans l'URL

  if (searchValue) {
    await ensureIngredientsLoaded(); // S'assurer que `ingredients` est prêt
    await getRecipeDetails(searchValue); // Récupère les détails de la recette
    applyGradientToSteps(); // Applique un dégradé aux étapes
    if (getLike()) {
      mealView.btnLike.classList.add("liked"); // Ajoute la classe "liked" si la recette est aimée
    }
  }
};

// Fonction pour récupérer les détails d'une recette
const getRecipeDetails = async (mealName) => {
  try {
    const meals = await fetchMealsByType(mealName, "meal"); // Récupère les repas par type

    if (!meals || meals.length === 0) {
      console.error("Aucune recette trouvée !");
      mealView.displayError("Aucune recette trouvée."); // Affiche une erreur si aucune recette n'est trouvée
      return;
    }

    const meal = meals.filter((m) => m.strMeal === mealName)[0]; // Filtre pour trouver le repas correspondant
    view.title(meal.strMeal); // Met à jour le titre de la vue

    // Extraction des ingrédients et quantités
    let ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientName = meal[`strIngredient${i}`]?.trim(); // Nom de l'ingrédient
      const measure = meal[`strMeasure${i}`]?.trim(); // Quantité de l'ingrédient

      if (ingredientName) {
        const formattedName = capitalizeWords(ingredientName); // Formate le nom de l'ingrédient
        const ingredient = ingredients.find(
          (ing) => ing.getName().toLowerCase() === formattedName.toLowerCase()
        );

        ingredientsList.push({
          measure: measure || "", // Ajoute la quantité ou une chaîne vide
          name: ingredient ? ingredient.getName() : formattedName, // Ajoute le nom si pas trouvé
          image: ingredient ? ingredient.getSmall() : "", // Image vide si introuvable
        });
      }
    }

    // Gestion des catégories
    const categories = meal.strTags ? stringToArray(meal.strTags) : []; // Transforme les tags en tableau

    // Transformation des instructions en étapes claires
    const instructions = meal.strInstructions
      ? meal.strInstructions
          .split(/\r\n|\n|\.\s|\d+\.\s?|step\s\d+\s?:?/i) // Sépare les instructions en étapes
          .map((step) => step.trim()) // Supprime les espaces inutiles
          .filter((step) => step !== "" && step !== step.toUpperCase()) // Filtre les étapes vides ou en majuscules
      : [];

    // Mise à jour de l'affichage
    mealView.displayImage(meal.strMealThumb); // Affiche l'image du repas
    mealView.displayTitle(meal.strMeal); // Affiche le titre du repas
    mealView.displayIngredients(ingredientsList); // Affiche la liste des ingrédients
    mealView.displayInstructions(instructions); // Affiche les instructions
    mealView.displayCategories(categories); // Affiche les catégories
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la recette :",
      error
    ); // Affiche une erreur en cas de problème
  }
};

// Fonction pour vérifier si une recette est aimée
const getLike = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get("m"); // Récupère la valeur du paramètre "m"

  if (searchValue) {
    const likes = JSON.parse(localStorage.getItem("likes")) || []; // Récupère les likes depuis le localStorage
    return likes.includes(searchValue); // Vérifie si la recette est dans la liste des likes
  }
};

// Ajoute un gestionnaire d'événement pour le bouton "Retour"
mealView.btnBack.addEventListener("click", () => {
  window.history.back(); // Retourne à la page précédente
});

// Fonction pour ajouter ou retirer un like
const addLike = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get("m"); // Récupère la valeur du paramètre "m"

  if (!searchValue) return; // Vérifie que searchValue est valide

  let likes = JSON.parse(localStorage.getItem("likes")) || []; // Récupère les likes depuis le localStorage
  if (likes.includes(searchValue)) {
    likes = likes.filter((item) => item !== searchValue); // Retire le like si déjà présent
    mealView.btnLike.classList.remove("liked"); // Retire la classe "liked"
  } else {
    likes.unshift(searchValue); // Ajoute le like au début de la liste
    mealView.btnLike.classList.add("liked"); // Ajoute la classe "liked"
  }

  localStorage.setItem("likes", JSON.stringify(likes)); // Met à jour le localStorage
};

// Ajoute un gestionnaire d'événement pour le bouton "Like"
mealView.btnLike.addEventListener("click", addLike);
