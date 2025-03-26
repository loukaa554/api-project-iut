import { GlobalController } from "./controllers/globalController.js";
import { MealController } from "./controllers/mealController.js";
import { SearchController } from "./controllers/searchController.js";

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  new GlobalController();

  switch (page) {
    case "search":
      new SearchController();
      break;
    case "meal":
      new MealController();
      break;
  }
});
