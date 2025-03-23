/**
 * Applies a gradient color from #A7E9AF (Vert menthe) to #64C9CF (Bleu lagon)
 * to all elements with the class `.step .circle`.
 */
export const applyGradientToSteps = () => {
  const steps = document.querySelectorAll(".step .circle");
  const totalSteps = steps.length;

  if (totalSteps === 0) return;

  // Convert hex color to RGB
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
    const ratio = index / (totalSteps - 1); // Calculate the ratio (0 for the first, 1 for the last)
    const r = Math.round(startColor.r + ratio * (endColor.r - startColor.r));
    const g = Math.round(startColor.g + ratio * (endColor.g - startColor.g));
    const b = Math.round(startColor.b + ratio * (endColor.b - startColor.b));
    const color = `rgb(${r}, ${g}, ${b})`; // Generate the RGB color
    step.style.backgroundColor = color; // Apply the color to the element
  });
};
