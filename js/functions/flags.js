/**
 * Retourne l'émoji du drapeau correspondant à un pays donné.
 * @param {string} country - Nom du pays en anglais (ex: "french", "italian").
 * @returns {string} Emoji du drapeau ou un message d'erreur si non trouvé.
 */
export const getFlagEmoji = (country) => {
  const countryCodes = {
    american: "US",
    british: "GB",
    canadian: "CA",
    chinese: "CN",
    croatian: "HR",
    dutch: "NL",
    egyptian: "EG",
    filipino: "PH",
    french: "FR",
    greek: "GR",
    indian: "IN",
    irish: "IE",
    italian: "IT",
    jamaican: "JM",
    japanese: "JP",
    kenyan: "KE",
    malaysian: "MY",
    mexican: "MX",
    moroccan: "MA",
    polish: "PL",
    portuguese: "PT",
    russian: "RU",
    spanish: "ES",
    thai: "TH",
    tunisian: "TN",
    turkish: "TR",
    ukrainian: "UA",
    uruguayan: "UY",
    vietnamese: "VN",
  };

  // Récupérer le code ISO du pays
  const countryCode = countryCodes[country.toLowerCase()];
  if (!countryCode) {
    return "Drapeau non trouvé";
  }

  // Convertir les lettres du code ISO en émoji
  const emoji = countryCode
    .split("")
    .map((char) => String.fromCodePoint(0x1f1e6 - 65 + char.charCodeAt(0)))
    .join("");
  return emoji;
};
