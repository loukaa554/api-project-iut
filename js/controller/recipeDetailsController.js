import { capitalizeFirstLetter } from "../function/str.js";
import { recipeDetailView } from "../view/recipeDetailView.js";
import { ingredients } from "./init.js";

let meal = {};
let ingredientsList = [];
let categories = [];
let instructions = [];
const getRecipeDetails = async (id) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();

  if (!data.meals) {
    console.error("Aucune recette trouvée !");
    return;
  }

  meal = data.meals[0];

  // Récupération des ingrédients et quantités
  ingredientsList = [];
  for (let i = 1; i <= 20; i++) {
    let ingredientName = meal[`strIngredient${i}`];
    ingredientName = capitalizeFirstLetter(ingredientName);
    let measure = meal[`strMeasure${i}`];

    if (ingredientName && ingredientName.trim() !== "") {
      console.log("Ingredients:", ingredients);
      ingredients.filter((ing) => console.log(ing));
      let ingredient = ingredients.find((ing) => console.log(ing));
      console.log("IngredientName:", ingredientName);
      console.log("Ingredient:", ingredient);
      if (ingredient) {
        ingredientsList = [
          ...ingredientsList,
          {
            measure: measure ? measure.trim() : "",
            name: ingredient.getName(),
            image: ingredient.getMedium(),
          },
        ];
      } else {
        console.warn(
          `Ingredient "${ingredientName}" not found in the ingredients list.`
        );
      }
    }
  }

  // Récupération de la catégorie et des instructions
  categories = [meal.strCategory];

  // Transformation des instructions en tableau
  instructions = meal.strInstructions
    .split(/\r\n|\.\s/) // Sépare sur les sauts de ligne ou les points suivis d'un espace
    .filter((step) => step.trim() !== ""); // Supprime les éléments vides

  console.log("Meal:", meal);
  console.log("Ingredients:", ingredientsList);
  console.log("Categories:", categories);
  console.log("Instructions:", instructions);

  // Mise à jour de l'affichage
  recipeDetailView.image.src = meal.strMealThumb;
  recipeDetailView.title.textContent = meal.strMeal;
  recipeDetailView.ingredients.innerHTML = ingredientsList
    .map(
      (i) =>
        `<li class="ingredient"><img src="${i.image}" alt="${i.name}"/><div class="right"><p>${i.name}</p><p class="measure">${i.measure}</p></div></li>`
    )
    .join("");
  recipeDetailView.instructions.innerHTML = instructions
    .map((i) => `<li>${i}</li>`)
    .join("");

  // Affichage de la catégorie
  recipeDetailView.categories.innerHTML = categories
    .map((i) => `<li class="tag">${i}</li>`)
    .join("");
};

getRecipeDetails("52772");
