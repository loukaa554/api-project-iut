export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;

  let truncated = text.slice(0, maxLength);
  let lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > 0) {
    truncated = truncated.slice(0, lastSpaceIndex);
  }

  return truncated + "...";
};

export const slugStr = (str) => {
  return str
    .normalize("NFD") // Décompose les caractères accentués
    .replace(/\p{Diacritic}/gu, "") // Supprime les accents
    .toLowerCase() // Met en minuscule
    .replace(/\s+/g, "_") // Remplace les espaces par des underscores
    .replace(/_+/g, "_") // Supprime les underscores multiples
    .replace(/[^a-z0-9_]/g, ""); // Supprime les caractères spéciaux sauf les underscores
};

export const stringToArray = (str) => {
  return str.split(",").map((item) => item.trim());
};
