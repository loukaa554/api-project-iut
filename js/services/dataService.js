// Importation des modèles et des fonctions nécessaires
import { IngredientModel } from "../models/modelIngredient.js";
import { modelCategorie } from "../models/modelCategorie.js";
import { modelArea } from "../models/modelArea.js";
import {
  fetchIngredients,
  fetchCategories,
  fetchAreas,
} from "../models/modelApi.js";

// Déclaration des variables pour stocker les données récupérées
let ingredients = [];
let categories = [];
let areas = [];

/**
 * Fonction d'initialisation qui charge les données depuis l'API.
 * Elle récupère les ingrédients, les catégories et les pays, puis les mappe dans des modèles appropriés.
 */
const init = async () => {
  try {
    // Charger les ingrédients via modelApi et les transformer en objets IngredientModel
    const ingredientsData = await fetchIngredients();
    ingredients = ingredientsData.map(
      (ing) => new IngredientModel(ing.strIngredient, ing.strDescription)
    );

    // Charger les catégories via modelApi et les transformer en objets modelCategorie
    const categoriesData = await fetchCategories();
    categories = categoriesData.map(
      (cat) =>
        new modelCategorie(
          cat.strCategory,
          cat.strCategoryDescription,
          cat.strCategoryThumb
        )
    );

    // Charger les zones géographiques via modelApi et les transformer en objets modelArea
    const areasData = await fetchAreas();
    areas = areasData.map((area) => new modelArea(area.strArea));
  } catch (error) {
    // Gestion des erreurs de chargement des données
    console.error("Erreur lors du chargement des données", error);
  }
};

// Appel de la fonction d'initialisation pour récupérer les données au lancement
init();

// Export des données chargées pour pouvoir les utiliser dans d'autres parties de l'application
export { ingredients, categories, areas };
