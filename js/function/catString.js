export const getCatString = (name) => {
  const categoryMap = {
    ingredient: "Ingredient",
    area: "Specialité",
    category: "Catégorie",
    meal: "Recette",
  };

  return categoryMap[name] || "Inconnu";
};
