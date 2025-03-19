import { capitalizeFirstLetter, capitalizeWords } from "../function/str.js";
import { recipeDetailView } from "../view/recipeDetailView.js";
import { ingredients } from "./init.js";

let meal = {};
let ingredientsList = [];
let categories = [];
let instructions = [];

const getRecipeDetails = async (id) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
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
    await new Promise((resolve) => setTimeout(resolve, 11));
    for (let i = 1; i <= 20; i++) {
      let ingredientName = meal[`strIngredient${i}`];
      let measure = meal[`strMeasure${i}`];

      if (ingredientName && ingredientName.trim() !== "") {
        ingredientName = capitalizeWords(ingredientName.trim());

        // Utilisation de filter (renvoie un tableau)
        let filteredIngredients = ingredients.filter(
          (ing) => ing.getName() === ingredientName
        );

        // On prend le premier élément du tableau s'il existe
        let ingredient =
          filteredIngredients.length > 0 ? filteredIngredients[0] : null;

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
    categories = meal.strCategory ? [meal.strCategory] : [];

    // Transformation des instructions en tableau
    instructions = meal.strInstructions
      ? meal.strInstructions
          .split(/\r\n|\.\s/)
          .filter((step) => step.trim() !== "")
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
        (i) =>
          `<li class="ingredient">
            <img src="${i.image}" alt="${i.name}"/>
            <div class="right">
              <p>${i.name}</p>
              <p class="measure">${i.measure}</p>
            </div>
          </li>`
      )
      .join("");

    recipeDetailView.instructions.innerHTML = instructions
      .map((i) => `<li>${i}</li>`)
      .join("");

    recipeDetailView.categories.innerHTML = categories
      .map((i) => `<li class="tag">${i}</li>`)
      .join("");
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la recette :",
      error
    );
  }
};

getRecipeDetails("52772");
