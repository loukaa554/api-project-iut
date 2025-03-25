import { IngredientModel } from "../models/modelIngredient.js";
import { modelCategorie } from "../models/modelCategorie.js";
import { modelArea } from "../models/modelArea.js";
import {
  fetchIngredients,
  fetchCategories,
  fetchAreas,
} from "../models/modelApi.js";

let ingredients = [];
let categories = [];
let areas = [];

const init = async () => {
  try {
    // Charger les ingrédients via modelApi
    const ingredientsData = await fetchIngredients();
    ingredients = ingredientsData.map(
      (ing) => new IngredientModel(ing.strIngredient, ing.strDescription)
    );

    // Charger les catégories via modelApi
    const categoriesData = await fetchCategories();
    categories = categoriesData.map(
      (cat) =>
        new modelCategorie(
          cat.strCategory,
          cat.strCategoryDescription,
          cat.strCategoryThumb
        )
    );

    // Charger les pays via modelApi
    const areasData = await fetchAreas();
    areas = areasData.map((area) => new modelArea(area.strArea));
  } catch (error) {
    console.error("Erreur lors du chargement des données", error);
  }
};

init();

export { ingredients, categories, areas };
