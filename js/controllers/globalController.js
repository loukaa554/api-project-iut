import { getBaseUrl } from "../functions/url.js";
import { fetchMeals, fetchRandomMeal } from "../models/modelApi.js";
import { view } from "../views/globalView.js";
import { areas, categories, ingredients } from "./init.js";

// Variables globales
let selectedIndex = -1;

// Gestion des événements liés à la recherche
const handleSearchInput = async (e) => {
  const searchValue = e.target.value.toLowerCase().trim();
  if (!searchValue) {
    view.suggestions.classList.remove("active");
    return;
  }
  view.suggestions.classList.add("active");

  let allResults = [
    ...ingredients.map((i) => ({
      name: i.getName(),
      type: "ingredient",
      image: i.getSmall(),
    })),
    ...categories.map((c) => ({
      name: c.getName(),
      type: "category",
      image: c.getImage(),
    })),
    ...areas.map((a) => ({ name: a.getName(), type: "area", image: null })),
  ];

  try {
    const meals = await fetchMeals(searchValue);
    allResults.push(
      ...meals.map((meal) => ({
        name: meal.strMeal,
        type: "meal",
        image: meal.strMealThumb,
      }))
    );
  } catch (error) {
    console.error("Erreur lors de la recherche des recettes :", error);
  }

  allResults = allResults.filter((item) =>
    item.name.toLowerCase().includes(searchValue)
  );

  // Trier pour mettre en avant les résultats qui commencent par la recherche
  allResults.sort((a, b) => {
    const aStartsWith = a.name.toLowerCase().startsWith(searchValue) ? -1 : 1;
    const bStartsWith = b.name.toLowerCase().startsWith(searchValue) ? -1 : 1;
    return aStartsWith - bStartsWith;
  });

  allResults = allResults.slice(0, 6);
  // Affichage des suggestions de recherche
  view.displaySuggestions(searchValue, allResults);
  selectedIndex = -1;
};

// Gestion du clavier pour la navigation dans les suggestions
const handleKeyboardNavigation = (e) => {
  const items = document.querySelectorAll(".item");

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (selectedIndex < items.length - 1) selectedIndex++;
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (selectedIndex > -1) selectedIndex--;
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (selectedIndex === -1) {
      console.log(`${getBaseUrl()}/search/?q=${view.search.value}&type=all`);
      // window.location.href = `${getBaseUrl()}/search/?q=${
      //   view.search.value
      // }&type=all`;
    } else if (items[selectedIndex]?.dataset.url) {
      window.location.href = items[selectedIndex].dataset.url;
    }
  }

  items.forEach((item, index) =>
    item.classList.toggle("selected", index === selectedIndex)
  );
};

// Gestion de la recherche aléatoire
const randomRecipe = async () => {
  const mealName = await fetchRandomMeal();
  if (mealName) {
    window.location.href = `${getBaseUrl()}/meal/?m=${mealName}`;
  }
};

const toggleDarkMode = () => {
  view.body.classList.toggle("dark");
  localStorage.setItem("darkMode", view.body.classList.contains("dark"));
};

// Configuration des événements UI
const setupEventListeners = () => {
  console.log(getBaseUrl());

  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");

  if (type === "like") {
    view.searchLikeBtn.classList.add("active");
  }

  if (view.search) {
    view.search.addEventListener("focus", () =>
      view.body.classList.add("search-focus")
    );
    view.search.addEventListener("blur", () =>
      view.body.classList.remove("search-focus")
    );
    view.suggestions.addEventListener("mousedown", (e) => e.preventDefault());
    view.search.addEventListener("input", handleSearchInput);
    view.search.addEventListener("keydown", handleKeyboardNavigation);
    view.searchRandomBtn.addEventListener("click", randomRecipe);
  }
  view.iconResp.addEventListener("click", view.toggleNav);

  if (view.searchDarkBtn) {
    view.searchDarkBtn.addEventListener("click", toggleDarkMode);
  }
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    view.body.classList
      ? view.body.classList.add("dark")
      : view.body.classList.remove("dark");
  }
  view.displayDate();
};

// Initialisation de l'application
setupEventListeners();
