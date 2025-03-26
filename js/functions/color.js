/**
 * Applique un dégradé de couleur de #A7E9AF (Vert menthe) à #64C9CF (Bleu lagon)
 * sur tous les éléments ayant la classe `.step .circle`.
 */
export const applyGradientToSteps = () => {
  const steps = document.querySelectorAll(".step .circle");
  const totalSteps = steps.length;

  if (totalSteps === 0) return;

  // Convertit une couleur hexadécimale en RGB
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const startColor = hexToRgb("#A7E9AF");
  const endColor = hexToRgb("#64C9CF");

  steps.forEach((step, index) => {
    const ratio = index / (totalSteps - 1); // Calcule le ratio (0 pour le premier, 1 pour le dernier)
    const r = Math.round(startColor.r + ratio * (endColor.r - startColor.r));
    const g = Math.round(startColor.g + ratio * (endColor.g - startColor.g));
    const b = Math.round(startColor.b + ratio * (endColor.b - startColor.b));
    const color = `rgb(${r}, ${g}, ${b})`; // Génère la couleur RGB
    step.style.backgroundColor = color; // Applique la couleur à l'élément
  });
};
