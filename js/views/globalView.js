/**
 * Module `view` pour gérer l'affichage des recettes dans l'interface utilisateur.
 */

import { defaultIcon, menuIcon, closeIcon } from "../utils/icons.js";
import { getFlagEmoji } from "../functions/flags.js";
import { getCatString } from "../functions/catString.js";

export const view = {
  body: document.body,
  base: document.querySelector("base"),

  // Référence à l'élément de nav.
  nav: document.getElementById("nav"),
  iconResp: document.getElementById("iconResp"),

  // Référence à l'élément d'entrée pour saisir un ingrédient.
  search: document.getElementById("search"),
  searchRandomBtn: document.getElementById("searchRandomBtn"),

  // Référence au suggestions
  suggestions: document.getElementById("suggestions"),
  firstSuggestion: document.getElementById("firstSuggestion"),
  suggestion: document.getElementsByClassName("item-suggest"),

  searchLikeBtn: document.getElementById("searchLikeBtn"),
  searchDarkBtn: document.getElementById("searchDarkBtn"),

  // Référence au conteneur où les recettes seront affichées.

  // Référence au Footer
  footerDate: document.getElementById("footerDate"),

  title: (title) => {
    document.title = title + " - Reciply";
  },

  displaySuggestions(searchValue, allResults = []) {
    // Ajoute la première suggestion "Rechercher ..."
    let suggestionsHTML = `
    <a href="/search/?q=${searchValue}&type=all" class="item" data-url="/search/?q=${searchValue}&type=all">
      <div class="left">
        ${defaultIcon}
        <span id="firstSuggestion">Rechercher "${searchValue}"</span>
      </div>
      <i>Tous les résultats</i>
    </a>
  `;

    // Ajoute les suggestions de résultats si disponibles
    if (allResults.length > 0) {
      suggestionsHTML += allResults
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
          }">
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
    }

    // Injecte le HTML final dans la vue
    view.suggestions.innerHTML = suggestionsHTML;
  },

  toggleNav() {
    view.iconResp.innerHTML = view.nav.classList.contains("active")
      ? menuIcon
      : closeIcon;
    view.nav.classList.toggle("active");
  },

  displayDate: () => {
    const date = new Date();
    view.footerDate.textContent = date.getFullYear();
  },
};
