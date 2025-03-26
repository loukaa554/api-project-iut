import { getBaseUrl } from "../functions/url.js";
import { fetchMeals, fetchRandomMeal } from "../models/modelApi.js";
import { view } from "../views/globalView.js";
import { areas, categories, ingredients } from "../services/dataService.js";

export class GlobalController {
  constructor() {
    this.selectedIndex = -1;
    this.setupEventListeners();
  }

  async handleSearchInput(e) {
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

    allResults.sort((a, b) => {
      const aStartsWith = a.name.toLowerCase().startsWith(searchValue) ? -1 : 1;
      const bStartsWith = b.name.toLowerCase().startsWith(searchValue) ? -1 : 1;
      return aStartsWith - bStartsWith;
    });

    allResults = allResults.slice(0, 6);
    view.displaySuggestions(searchValue, allResults);
    this.selectedIndex = -1;
  }

  handleKeyboardNavigation(e) {
    const items = document.querySelectorAll(".item");

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (this.selectedIndex < items.length - 1) this.selectedIndex++;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (this.selectedIndex > -1) this.selectedIndex--;
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (this.selectedIndex === -1) {
        window.location.href = `${getBaseUrl()}/search/?q=${
          view.search.value
        }&type=all`;
      } else if (items[this.selectedIndex]?.dataset.url) {
        window.location.href = items[this.selectedIndex].dataset.url;
      }
    }

    items.forEach((item, index) =>
      item.classList.toggle("selected", index === this.selectedIndex)
    );
  }

  async randomRecipe() {
    const mealName = await fetchRandomMeal();
    if (mealName) {
      window.location.href = `${getBaseUrl()}/meal/?m=${mealName}`;
    }
  }

  toggleDarkMode() {
    view.body.classList.toggle("dark");
    localStorage.setItem("darkMode", view.body.classList.contains("dark"));
  }

  setupEventListeners() {
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
      view.search.addEventListener("input", (e) => this.handleSearchInput(e));
      view.search.addEventListener("keydown", (e) =>
        this.handleKeyboardNavigation(e)
      );
      view.searchRandomBtn.addEventListener("click", () => this.randomRecipe());
    }
    view.iconResp.addEventListener("click", view.toggleNav);

    if (view.searchDarkBtn) {
      view.searchDarkBtn.addEventListener("click", () => this.toggleDarkMode());
    }
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
      view.body.classList
        ? view.body.classList.add("dark")
        : view.body.classList.remove("dark");
    }
    view.displayDate();
  }
}
