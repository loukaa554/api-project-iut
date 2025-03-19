import { areas, categories, ingredients } from "../controller/init.js";
import { view } from "../view/view.js";
import { getFlagEmoji } from "../function/flags.js";

let recipes;

const searchRecipes = async (ingredient) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();

  console.log(data.meals);

  recipes = data.meals;
  view.displayRecipes(recipes);
};
view.search.addEventListener("input", async (e) => {
  const searchValue = e.target.value.toLowerCase().trim();

  if (searchValue === "") {
    view.suggestions.style.display = "none";
    return;
  }

  view.suggestions.style.display = "block";

  // Icône par défaut pour les éléments sans image (catégories et pays)
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
    }
    return null; // Pas d'image pour catégories et pays
  };

  // Fusionner tous les résultats en une seule liste
  let allResults = [
    ...ingredients.map((i) => ({
      name: i.getName(),
      type: "ingredient",
      image: getImageUrl(i, "ingredient"),
    })),
    ...categories.map((c) => ({
      name: c.getName(),
      type: "category",
      image: null,
    })), // Pas d'image pour catégories
    ...areas.map((a) => ({ name: a.getName(), type: "area", image: null })), // Pas d'image pour pays
  ];

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
    <div class="item">
      ${defaultIcon}
      <span id="firstSuggestion">Rechercher "${e.target.value}"</span>
    </div>
  `;

  // Ajouter les autres résultats
  view.suggestions.innerHTML += allResults
    .map(
      (item) => `
      <div class="item item-suggest">
        ${
          item.image
            ? `<img src="${item.image}" alt="${item.name}" loading="lazy"/>`
            : item.type === "area"
            ? `<div class="icon">${getFlagEmoji(item.name)}</div>`
            : defaultIcon
        }
        ${item.name}
      </div>
    `
    )
    .join("");
});
