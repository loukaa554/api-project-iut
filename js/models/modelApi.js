/**
 * Domaine de l'API utilisé pour récupérer les données sur les repas.
 */
export const DOMAIN = "https://www.themealdb.com/api/json/v1/1/";

/**
 * Objet contenant les différentes URLs de l'API pour récupérer les données.
 */
export const API = {
  ingredients: `${DOMAIN}list.php?i=list`,
  categories: `${DOMAIN}categories.php`,
  areas: `${DOMAIN}list.php?a=list`,
  searchMeal: (query) => `${DOMAIN}search.php?s=${query}`,
  randomMeal: `${DOMAIN}random.php`,
  filter: {
    ingredient: (ingredient) => `${DOMAIN}filter.php?i=${ingredient}`,
    category: (category) => `${DOMAIN}filter.php?c=${category}`,
    area: (area) => `${DOMAIN}filter.php?a=${area}`,
  },
};

/**
 * Fonction générique pour effectuer des appels API et récupérer les données JSON.
 * @param {string} url - L'URL de l'API à appeler.
 * @returns {Promise<Array>} - Retourne un tableau contenant les résultats ou un tableau vide en cas d'erreur.
 */
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données depuis ${url}:`,
      error
    );
    return [];
  }
};

/**
 * Récupère les repas correspondant à une recherche spécifique.
 * @param {string} searchValue - Le terme de recherche.
 * @returns {Promise<Array>} - Retourne un tableau de repas.
 */
export const fetchMeals = async (searchValue) =>
  fetchData(API.searchMeal(searchValue));

/**
 * Récupère les repas selon un type spécifique (ingrédient, catégorie, zone, ou général).
 * @param {string} searchValue - Le terme de recherche.
 * @param {string} type - Le type de recherche ("ingredient", "area", "category" ou "all").
 * @returns {Promise<Array>} - Retourne un tableau de repas correspondant au type de recherche.
 */
export const fetchMealsByType = async (searchValue, type) => {
  const url =
    type === "ingredient"
      ? API.filter.ingredient(searchValue)
      : type === "area"
      ? API.filter.area(searchValue)
      : type === "category"
      ? API.filter.category(searchValue)
      : API.searchMeal(searchValue);

  return fetchData(encodeURI(url));
};

/**
 * Récupère la description d'un repas en fonction de son nom.
 * @param {string} mealName - Le nom du repas.
 * @returns {Promise<string>} - Retourne la description du repas.
 */
export const fetchMealDescription = async (mealName) => {
  const meals = await fetchData(API.searchMeal(mealName));
  return meals.length ? meals[0].strInstructions : "";
};

/**
 * Récupère un repas aléatoire.
 * @returns {Promise<string|null>} - Retourne le nom du repas ou null si aucun résultat.
 */
export const fetchRandomMeal = async () => {
  const meals = await fetchData(API.randomMeal);
  return meals.length ? meals[0].strMeal : null;
};

/**
 * Récupère la liste des ingrédients disponibles.
 * @returns {Promise<Array>} - Retourne un tableau contenant les ingrédients.
 */
export const fetchIngredients = async () => fetchData(API.ingredients);

/**
 * Récupère la liste des catégories de repas disponibles.
 * @returns {Promise<Array>} - Retourne un tableau contenant les catégories.
 */
export const fetchCategories = async () => fetchData(API.categories);

/**
 * Récupère la liste des zones (pays) disponibles.
 * @returns {Promise<Array>} - Retourne un tableau contenant les zones.
 */
export const fetchAreas = async () => fetchData(API.areas);
