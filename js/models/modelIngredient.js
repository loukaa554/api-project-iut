/**
 * Modèle représentant un ingrédient dans l'application.
 * Ce modèle permet de gérer les informations d'un ingrédient comme son nom, ses images de différentes tailles, son URL et sa description.
 */
export class IngredientModel {
  /**
   * Constructeur de la classe IngredientModel.
   * Initialise un ingrédient avec ses propriétés de base.
   *
   * @param {string} name - Le nom de l'ingrédient.
   * @param {string} description - La description de l'ingrédient.
   * @param {string} url - L'URL de la page de l'ingrédient.
   */
  constructor(name, description, url) {
    // Définit les valeurs par défaut pour les propriétés si aucune valeur n'est fournie.
    this._name = name ?? "Ingrédient inconnu"; // Nom de l'ingrédient, par défaut "Ingrédient inconnu"
    this._url = url ?? ""; // URL associée à l'ingrédient, par défaut vide
    // Les liens vers les images de l'ingrédient avec différentes tailles
    this._small = `https://www.themealdb.com/images/ingredients/${this._name.toLowerCase()}-small.png`;
    this._medium = `https://www.themealdb.com/images/ingredients/${this._name.toLowerCase()}-medium.png`;
    this._large = `https://www.themealdb.com/images/ingredients/${this._name.toLowerCase()}-large.png`;
    this._description = description ?? ""; // Description de l'ingrédient, par défaut vide
  }

  // **Getters** : Ces méthodes permettent d'accéder aux valeurs privées des propriétés de l'ingrédient

  /**
   * Retourne le nom de l'ingrédient.
   * @returns {string} Le nom de l'ingrédient.
   */
  getName() {
    return this._name;
  }

  /**
   * Retourne l'URL associée à l'ingrédient.
   * @returns {string} L'URL de l'ingrédient.
   */
  getUrl() {
    return this._url;
  }

  /**
   * Retourne l'image de l'ingrédient en petite taille.
   * @returns {string} L'URL de l'image petite taille.
   */
  getSmall() {
    return this._small;
  }

  /**
   * Retourne l'image de l'ingrédient en taille moyenne.
   * @returns {string} L'URL de l'image taille moyenne.
   */
  getMedium() {
    return this._medium;
  }

  /**
   * Retourne l'image de l'ingrédient en grande taille.
   * @returns {string} L'URL de l'image grande taille.
   */
  getLarge() {
    return this._large;
  }

  /**
   * Retourne la description de l'ingrédient.
   * @returns {string} La description de l'ingrédient.
   */
  getDescription() {
    return this._description;
  }

  // **Setters** : Ces méthodes permettent de modifier les propriétés de l'ingrédient

  /**
   * Définit le nom de l'ingrédient.
   * @param {string} name - Le nouveau nom de l'ingrédient.
   */
  setName(name) {
    this._name = name;
  }

  /**
   * Définit l'URL associée à l'ingrédient.
   * @param {string} url - La nouvelle URL de l'ingrédient.
   */
  setUrl(url) {
    this._url = url;
  }

  /**
   * Définit l'image de l'ingrédient en petite taille.
   * @param {string} image - La nouvelle URL de l'image petite taille.
   */
  setSmall(image) {
    this._small = image;
  }

  /**
   * Définit l'image de l'ingrédient en taille moyenne.
   * @param {string} image - La nouvelle URL de l'image taille moyenne.
   */
  setMedium(image) {
    this._medium = image;
  }

  /**
   * Définit l'image de l'ingrédient en grande taille.
   * @param {string} image - La nouvelle URL de l'image grande taille.
   */
  setLarge(image) {
    this._large = image;
  }

  /**
   * Définit la description de l'ingrédient.
   * @param {string} description - La nouvelle description de l'ingrédient.
   */
  setDescription(description) {
    this._description = description;
  }
}
