/**
 * Tronque une chaîne de texte à une longueur maximale sans couper un mot.
 *
 * @param {string} text - Le texte à tronquer.
 * @param {number} maxLength - La longueur maximale du texte.
 * @returns {string} Le texte tronqué suivi de "..." si nécessaire.
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;

  let truncated = text.slice(0, maxLength);
  let lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > 0) {
    truncated = truncated.slice(0, lastSpaceIndex);
  }

  return truncated + "...";
};

/**
 * Convertit une chaîne en une version "slug" (URL-friendly).
 *
 * @param {string} str - La chaîne à transformer.
 * @returns {string} La chaîne transformée en slug.
 */
export const slugStr = (str) => {
  return str
    .normalize("NFD") // Décompose les caractères accentués
    .replace(/\p{Diacritic}/gu, "") // Supprime les accents
    .toLowerCase() // Met en minuscule
    .replace(/\s+/g, "_") // Remplace les espaces par des underscores
    .replace(/_+/g, "_") // Supprime les underscores multiples
    .replace(/[^a-z0-9_]/g, ""); // Supprime les caractères spéciaux sauf les underscores
};

/**
 * Convertit une chaîne séparée par des virgules en un tableau de chaînes.
 *
 * @param {string} str - La chaîne d'entrée.
 * @returns {string[]} Tableau des éléments séparés.
 */
export const stringToArray = (str) => {
  return str.split(",").map((item) => item.trim());
};

/**
 * Met en majuscule la première lettre d'une chaîne.
 *
 * @param {string} str - La chaîne d'entrée.
 * @returns {string} La chaîne avec la première lettre en majuscule.
 */
export const capitalizeFirstLetter = (str) => {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Met en majuscule la première lettre de chaque mot dans une chaîne.
 *
 * @param {string} str - La chaîne d'entrée.
 * @returns {string} La chaîne avec chaque mot capitalisé.
 */
export const capitalizeWords = (str) => {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};

/**
 * Divise une chaîne en un tableau de mots.
 *
 * @param {string} str - La chaîne d'entrée.
 * @returns {string[]} Tableau des mots extraits.
 */
export const splitString = (str) => str.split(" ");
