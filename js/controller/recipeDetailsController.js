import { applyGradientToSteps } from "../function/color.js";
import { capitalizeWords, stringToArray } from "../function/str.js";
import { recipeDetailView } from "../view/recipeDetailView.js";
import { ingredients } from "./init.js";

let meal = {};
let ingredientsList = [];
let categories = [];
let instructions = [];

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get("m");

  if (searchValue) {
    getRecipeDetails(searchValue).then(() => applyGradientToSteps());
  }
};

const getRecipeDetails = async (mealName) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );

    if (!response.ok) {
      throw new Error(`Erreur réseau : ${response.status}`);
    }

    const data = await response.json();

    if (!data.meals) {
      console.error("Aucune recette trouvée !");
      return;
    }

    meal = data.meals[0];

    // Récupération des ingrédients et quantités
    ingredientsList = [];
    await new Promise((resolve) => setTimeout(resolve, 50));

    for (let i = 1; i <= 20; i++) {
      let ingredientName = meal[`strIngredient${i}`];
      let measure = meal[`strMeasure${i}`];

      if (ingredientName && ingredientName.trim() !== "") {
        ingredientName = capitalizeWords(ingredientName.trim());

        let ingredient = ingredients.find(
          (ing) => ing.getName() === ingredientName
        );

        if (ingredient) {
          ingredientsList.push({
            measure: measure ? measure.trim() : "",
            name: ingredient.getName(),
            image: ingredient.getSmall(),
          });
        } else {
          console.warn(`Ingrédient "${ingredientName}" non trouvé.`);
        }
      }
    }
    // Récupération de la catégorie et des instructions
    categories = stringToArray(meal.strTags);

    // Transformation des instructions en tableau
    instructions = meal.strInstructions
      ? meal.strInstructions
          .split(/\r\n|\.\s|\d+\.\s?|step\s\d+\s?:?/i) // Ajout du motif "step X" pour la séparation
          .filter((step) => step.trim() !== "" && step !== step.toUpperCase()) // Filtrer les lignes en majuscules
      : [];

    console.log("Meal:", meal);
    console.log("Ingredients:", ingredientsList);
    console.log("Categories:", categories);
    console.log("Instructions:", instructions);

    // Mise à jour de l'affichage
    recipeDetailView.image.src = meal.strMealThumb || "";
    recipeDetailView.title.textContent = meal.strMeal || "Nom inconnu";
    recipeDetailView.ingredients.innerHTML = ingredientsList
      .map(
        (i) => `
          <li class="ingredient">
            <img src="${i.image}" alt="${i.name}"/>
            <div class="right">
              <p>${i.name}</p>
              <p class="measure">${i.measure}</p>
            </div>
          </li>`
      )
      .join("");

    recipeDetailView.instructions.innerHTML = instructions
      .map(
        (i, index) => `
        <div class="step">
          <div class="circle">${index + 1}</div>
          <p>${i}</p>
        </div>`
      )
      .join("");

    recipeDetailView.categories.innerHTML = categories
      .map((i) => `<li class="info">${i}</li>`)
      .join("");
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la recette :",
      error
    );
  }
};
