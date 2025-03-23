/**
 * Retourne une chaîne de caractères correspondant à une catégorie donnée.
 *
 * @param {string} name - Le nom de la catégorie (par exemple : "ingredient", "area", "category", "meal").
 * @returns {string} La chaîne de caractères associée à la catégorie, ou "Inconnu" si la catégorie n'est pas reconnue.
 */
export const getCatString = (name) => {
  const categoryMap = {
    ingredient: "Ingredient",
    area: "Specialité",
    category: "Catégorie",
    meal: "Recette",
  };

  return categoryMap[name] || "Inconnu";
};
