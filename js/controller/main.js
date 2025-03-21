import { areas, categories, ingredients } from "../controller/init.js";
import { view } from "../view/view.js";
import { getFlagEmoji } from "../function/flags.js";
import { getCatString } from "../function/catString.js";

let selectedIndex = -1; // Index de l'élément sélectionné

view.search.addEventListener("focus", () => {
  view.body.classList.add("search-focus");
});
view.suggestions.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Empêche le blur de se déclencher immédiatement
});
view.search.addEventListener("blur", () => {
  view.body.classList.remove("search-focus");
});

view.search.addEventListener("input", async (e) => {
  const searchValue = e.target.value.toLowerCase().trim();

  if (searchValue === "") {
    view.suggestions.classList.remove("active");
  } else {
    view.suggestions.classList.add("active");
  }

  // Icône par défaut pour les éléments sans image
  const defaultIcon = `
    <svg stroke="currentColor" fill="currentColor" stroke-width="0"
        viewBox="0 0 24 24" height="200px" width="200px"
        xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 
                2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 
                11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 
                18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 
                19.4853L19.4853 18.0711Z">
      </path>
    </svg>
  `;

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
    ...categories.map((c) => ({
      name: c.getName(),
      type: "category",
      image: c.getImage(),
    })),
    ...areas.map((a) => ({ name: a.getName(), type: "area", image: null })),
  ];

  // Recherche des recettes en direct depuis l'API
  try {
    const recipeResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
    );
    const recipeData = await recipeResponse.json();

    if (recipeData.meals) {
      allResults.push(
        ...recipeData.meals.map((meal) => ({
          name: meal.strMeal,
          type: "meal",
          image: meal.strMealThumb,
        }))
      );
    }
  } catch (error) {
    console.error("Erreur lors de la recherche des recettes :", error);
  }

  // Filtrer les résultats en fonction de la recherche
  allResults = allResults.filter((item) =>
    item.name.toLowerCase().includes(searchValue)
  );

  // Trier pour mettre en avant les résultats qui commencent par la recherche
  allResults.sort((a, b) => {
    const aStartsWith = a.name.toLowerCase().startsWith(searchValue) ? -1 : 1;
    const bStartsWith = b.name.toLowerCase().startsWith(searchValue) ? -1 : 1;
    return aStartsWith - bStartsWith;
  });

  // Limiter à 6 résultats (le premier sera "Rechercher [mot]")
  allResults = allResults.slice(0, 6);

  // Premier élément : "Rechercher [mot]"
  view.suggestions.innerHTML = `
    <a href="/search/?q=${searchValue}&type=all" class="item" data-url="/search/?q=${searchValue}&type=all">
      <div class="left">
        ${defaultIcon}
        <span id="firstSuggestion">Rechercher "${e.target.value}"</span>
      </div>
      <i>Tous les résultats</i>
    </a>
  `;

  // Ajouter les autres résultats
  view.suggestions.innerHTML += allResults
    .map(
      (item) => `
      <a href="${
        item.type === "meal"
          ? `/meal/?m=${item.name}`
          : `/search/?q=${item.name}&type=${item.type}`
      }" class="item item-suggest" data-url="${
        item.type === "meal"
          ? `/meal/?m=${item.name}`
          : `/search/?q=${item.name}&type=${item.type}`
      }"
      >
        <div class="left">
          ${
            item.image
              ? `<img src="${item.image}" alt="${item.name}" loading="lazy"/>`
              : item.type === "area"
              ? `<div class="icon">${getFlagEmoji(item.name)}</div>`
              : defaultIcon
          }
          ${item.name}
        </div>
        <i class="right">${getCatString(item.type)}</i>
      </a>
    `
    )
    .join("");

  // Réinitialiser l'index de sélection
  selectedIndex = -1;
});

// Gestion de la navigation au clavier
view.search.addEventListener("keydown", (e) => {
  const items = document.querySelectorAll(".item");

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (selectedIndex < items.length - 1) {
      selectedIndex++;
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (selectedIndex > -1) {
      selectedIndex--;
    }
  } else if (e.key === "Enter") {
    console.log(selectedIndex);
    e.preventDefault();
    if (items[selectedIndex]?.dataset.url) {
      window.location.href = items[selectedIndex].dataset.url;
    } else {
      if (selectedIndex === -1) {
        console.log("first");
        window.location.href = `/search/?q=${view.search.value}&type=all`;
      } else {
        window.location.href = items[selectedIndex].dataset.url;
      }
    }
  }

  // Mettre à jour l'affichage des éléments sélectionnés
  items.forEach((item, index) => {
    item.classList.toggle("selected", index === selectedIndex);
  });
});

const randomRecipe = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    window.location.href = `/meal/?m=${data.meals[0].strMeal}`;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération d'une recette aléatoire :",
      error
    );
  }
};
view.searchRandomBtn.addEventListener("click", randomRecipe);

const displayDate = () => {
  const date = new Date();
  view.footerDate.textContent = date.getFullYear();
};
displayDate();

// nav
view.iconResp.addEventListener("click", () => {
  const menuIcon = `
          <svg
            class="icon-resp"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="200px"
            width="200px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6l16 0"></path>
            <path d="M4 12l16 0"></path>
            <path d="M4 18l16 0"></path>
          </svg>`;

  const closeIcon = `<svg 
            class="icon-resp" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M18 6l-12 12"></path><path d="M6 6l12 12"></path></svg>`;

  view.iconResp.innerHTML = view.nav.classList.contains("active")
    ? menuIcon
    : closeIcon;
  view.nav.classList.toggle("active");
});
