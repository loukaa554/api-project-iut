/**
 * Vue pour afficher les détails d'une recette.
 * Cet objet contient des références aux éléments HTML utilisés pour afficher les informations d'une recette.
 *
 * @property {HTMLElement} image - Élément HTML pour afficher l'image de la recette.
 * @property {HTMLElement} title - Élément HTML pour afficher le titre de la recette.
 * @property {HTMLElement} ingredients - Élément HTML pour afficher la liste des ingrédients.
 * @property {HTMLElement} instructions - Élément HTML pour afficher les étapes de préparation.
 * @property {HTMLElement} cookingTime - Élément HTML pour afficher le temps de cuisson.
 * @property {HTMLElement} difficulty - Élément HTML pour afficher le niveau de difficulté de la recette.
 * @property {HTMLElement} nbPersonnes - Élément HTML pour afficher le nombre de personnes pour la recette.
 */
export const mealView = {
  image: document.querySelector(".recipeImage"),
  title: document.querySelector(".recipeTitle"),
  ingredients: document.querySelector(".ingredientsList"),
  instructions: document.querySelector(".stepsList"),
  categories: document.querySelector(".categoriesList"),

  btnBack: document.querySelector(".btn-back"),
  btnLike: document.querySelector(".btn-like"),

  displayImage(imageUrl) {
    this.image.src = imageUrl || "";
  },

  displayTitle(title) {
    this.title.textContent = title || "Nom inconnu";
  },

  displayIngredients(ingredientsList) {
    this.ingredients.innerHTML = ingredientsList
      .map(
        (i) => `
          <li class="ingredient">
            <img src="${i.image}" alt="${i.name}"/>
            <div class="right">
              <p>${i.name}</p>
              <p class="measure">${i.measure}</p>
            </div>
          </li>`
      )
      .join("");
  },

  displayInstructions(instructions) {
    this.instructions.innerHTML = instructions
      .map(
        (i, index) => `
        <div class="step">
          <div class="circle">${index + 1}</div>
          <p>${i}</p>
        </div>`
      )
      .join("");
  },

  displayCategories(categories) {
    this.categories.innerHTML = categories
      .map((i) => `<li class="info">${i}</li>`)
      .join("");
  },
};
