export const getBaseUrl = () => {
  let base = "";
  if (window.location.origin.includes("loukaa554.github.io")) {
    // alors récupérer le /nom-du-repo/
    base = window.location.pathname.split("/")[1];
  }
  return window.location.origin + "/" + base;
};
