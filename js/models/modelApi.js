export const DOMAIN = "https://www.themealdb.com/";

export const API = {
  ingredients: `${DOMAIN}api/json/v1/1/list.php?i=list`,
  categories: `${DOMAIN}api/json/v1/1/categories.php`,
  areas: `${DOMAIN}api/json/v1/1/list.php?a=list`,
  searchMeal: (query) => `${DOMAIN}api/json/v1/1/search.php?s=${query}`,
  randomMeal: `${DOMAIN}api/json/v1/1/random.php`,
  filter: {
    ingredient: (ingredient) =>
      `${DOMAIN}api/json/v1/1/filter.php?i=${ingredient}`,
    category: (category) => `${DOMAIN}api/json/v1/1/filter.php?c=${category}`,
    area: (area) => `${DOMAIN}api/json/v1/1/filter.php?a=${area}`,
  },
};

// Fonction générique pour les appels API
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

// Récupérer les plats correspondant à une recherche
export const fetchMeals = async (searchValue) =>
  fetchData(API.searchMeal(searchValue));

// Récupérer les plats selon le type
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

// Récupérer la description d’un plat
export const fetchMealDescription = async (mealName) => {
  const meals = await fetchData(API.searchMeal(mealName));
  return meals.length ? meals[0].strInstructions : "";
};

// Récupérer un plat aléatoire
export const fetchRandomMeal = async () => {
  const meals = await fetchData(API.randomMeal);
  return meals.length ? meals[0].strMeal : null;
};
