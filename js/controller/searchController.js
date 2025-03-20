import { slugStr, stringToArray, truncateText } from "../function/str.js";
import { view } from "../view/view.js";
import { ingredients } from "./init.js";
window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get("q");
  const type = urlParams.get("type");

  if (searchValue) {
    if (type === "ingredient") {
      console.log(searchValue);
      searchWithIngredient(searchValue, type);
    } else {
      search(searchValue, type);
    }
  }
};

const search = async (sv, type) => {
  const searchValue = sv.toLowerCase().trim();

  // Fonction pour récupérer l'image associée à chaque type d'élément
  const getImageUrl = (item, type) => {
    if (type === "ingredient") {
      return `https://www.themealdb.com/images/ingredients/${item
        .getName()
        .toLowerCase()}-small.png`;
    } else if (type === "meal") {
      return item.image || null;
    }
    return null;
  };

  // Fusionner ingrédients, catégories, pays et recettes
  let allResults = [
    ...ingredients.map((i) => ({
      name: i.getName(),
      type: "ingredient",
      image: getImageUrl(i, "ingredient"),
    })),
  ];

  // Recherche des recettes en direct depuis l'API
  // Recherche des recettes en direct depuis l'API
  try {
    const url =
      type === "ingredient"
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${slugStr(
            searchValue
          )}`
        : type === "area"
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchValue}`
        : type === "category"
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${slugStr(
            searchValue
          )}`
        : `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    console.log(url);
    const recipeResponse = await fetch(url);
    const recipeData = await recipeResponse.json();

    if (recipeData.meals) {
      const meals = await Promise.all(
        recipeData.meals.map(async (meal) => ({
          name: meal.strMeal,
          type: "meal",
          image: meal.strMealThumb,
          tags: meal.strTags && stringToArray(meal.strTags),
          description:
            meal.strInstructions || (await getDescription(meal.strMeal)),
        }))
      );
      allResults.push(...meals);
    }
  } catch (error) {
    console.error("Erreur lors de la recherche des recettes :", error);
  }

  // Filtrer les résultats en fonction de la recherche
  if (type === "all") {
    allResults = allResults.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
  }

  // Trier pour mettre en avant les résultats qui commencent par la recherche
  if (type !== "area" && type !== "category") {
    allResults.sort((a, b) => {
      const aStartsWith = a.name.toLowerCase().startsWith(searchValue) ? -1 : 1;
      const bStartsWith = b.name.toLowerCase().startsWith(searchValue) ? -1 : 1;
      return aStartsWith - bStartsWith;
    });
  }

  if (type === "ingredient") {
    displayIngredient(
      ingredients.find((i) => i.getName().toLowerCase() === searchValue)
    );
  }

  // Ajouter les autres résultats
  view.results.innerHTML += allResults
    .map(
      (item) => `
      <a href="/meal?m=${item.name}" class="item">
        <div class="left">
          <div>
            <h3>${item.name}</h3>
            <div class='tags'>
            ${
              item.tags
                ? item.tags
                    .map((tag) => `<span class="info tag">${tag}</span>`)
                    .join("")
                : ""
            }
                </div>
          </div>
          <p>
            ${truncateText(item.description, 200) || ""}
          </p>
        </div>
        <div class="right">
          <img
            src="${item.image || defaultIcon}"
            alt=""
          />
        </div>
      </a>
    `
    )
    .join("");
};

const searchWithIngredient = (ingredient, type) => {
  view.search.value = ingredient;
  search(ingredient, type);
};

const getDescription = async (meal) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    );
    const data = await response.json();
    return data.meals[0].strInstructions;
  } catch (error) {
    console.error("Erreur lors de la récupération des instructions :", error);
  }
};

const displayIngredient = (ing) => {
  view.ingredient.style.display = "block";
  view.ingredientDescription.innerText = ing.getDescription();
  view.ingredientName.innerText = ing.getName();
  view.ingredientImage.src = ing.getMedium();
};
