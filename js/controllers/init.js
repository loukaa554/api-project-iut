import { IngredientModel } from "../models/modelIngredient.js";
import { modelCategorie } from "../models/modelCategorie.js";
import { modelArea } from "../models/modelArea.js";

let ingredients = [];
let categories = [];
let areas = [];

const init = async () => {
  try {
    // Charger les ingrédients
    const ingredientsResponse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    const ingredientsData = await ingredientsResponse.json();
    ingredients = ingredientsData.meals.map(
      (ing) => new IngredientModel(ing.strIngredient, ing.strDescription)
    );

    // Charger les catégories
    const categoriesResponse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const categoriesData = await categoriesResponse.json();
    categories = categoriesData.categories.map(
      (cat) =>
        new modelCategorie(
          cat.strCategory,
          cat.strCategoryDescription,
          cat.strCategoryThumb
        )
    );

    // Charger les pays
    const areasResponse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const areasData = await areasResponse.json();
    areas = areasData.meals.map((area) => new modelArea(area.strArea));
  } catch (error) {
    console.error("Erreur lors du chargement des données", error);
  }
};

init();

export { ingredients, categories, areas };
