/**
 * Retourne l'URL de base de l'application, en tenant compte de l'hébergement sur GitHub Pages.
 *
 * @returns {string} L'URL de base du site.
 */
export const getBaseUrl = () => {
  let base = "";

  // Vérifie si l'application est hébergée sur GitHub Pages
  if (window.location.origin.includes("github.io")) {
    base = "/" + window.location.pathname.split("/")[1];
  }

  return window.location.origin + base;
};
