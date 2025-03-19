export class IngredientModel {
  /**
   * Nom de l'ingrédient.
   * @type {string}
   */
  _name;

  /**
   * URL de l'image de la recette.
   * @type {string}
   *
   */
  _url;

  /**
   * Image small de l'ingrédient.
   * @type {string}
   *
   */
  _small;

  /**
   * Image medium de l'ingrédient.
   * @type {string}
   */
  _medium;

  /**
   * Image large de l'ingrédient.
   * @type {string}
   */
  _large;

  /**
   * Description de l'ingrédient.
   * @type {string}
   */
  _description;

  /**
   * Constructeur de la classe IngredientModel.
   * @param {*} ingredient
   * @returns {Array} Liste des recettes
   */
  constructor(name, small, medium, large, url, description) {
    this._name = name ?? "Ingrédient inconnu";
    this.url = url ?? "";
    this._small =
      small ??
      `https://www.themealdb.com/images/ingredients/${item
        .getName()
        .toLowerCase()}-small.png` ??
      "";
    this.medium =
      medium ??
      `https://www.themealdb.com/images/ingredients/${item
        .getName()
        .toLowerCase()}-medium.png` ??
      "";
    this.large =
      large ??
      `https://www.themealdb.com/images/ingredients/${item
        .getName()
        .toLowerCase()}-large.png` ??
      "";
    this._description = description ?? "";
  }

  /**
   * Getter de l'attribut _name.
   * @returns {string} Nom de l'ingrédient.
   */
  getName() {
    return this._name;
  }

  /**
   * Getter de l'attribut _url.
   * @returns {string} URL de l'image de l'ingrédient.
   */
  getUrl() {
    return this._url;
  }

  /**
   * Getter de l'attribut _image.
   * @returns {string} Image de l'ingrédient.
   */
  getSmall() {
    return this._small;
  }

  /**
   * Getter de l'attribut _image.
   * @returns {string} Image de l'ingrédient.
   */
  getMedium() {
    return this._medium;
  }

  /**
   * Getter de l'attribut _image.
   * @returns {string} Image de l'ingrédient.
   */
  getLarge() {
    return this._large;
  }

  /**
   * Getter de l'attribut _description.
   * @returns {string} Description de l'ingrédient.
   */
  getDescription() {
    return this._description;
  }

  /**
   * Setter de l'attribut _name.
   * @param {string} name Nom de l'ingrédient.
   */
  setName(name) {
    this._name = name;
  }

  /**
   * Setter de l'attribut _url.
   * @param {string} url URL de l'image de l'ingrédient.
   */
  setUrl(url) {
    this._url = url;
  }

  /**
   * Setter de l'attribut _image.
   * @param {string} image Image de l'ingrédient.
   */
  setSmall(image) {
    this._small = image;
  }

  /**
   * Setter de l'attribut _image.
   * @param {string} image Image de l'ingrédient.
   */
  setMedium(image) {
    this._medium = image;
  }

  /**
   * Setter de l'attribut _image.
   * @param {string} image Image de l'ingrédient.
   */
  setLarge(image) {
    this._large = image;
  }

  /**
   * Setter de l'attribut _description.
   * @param {string} description Description de l'ingrédient.
   */
  setDescription(description) {
    this._description = description;
  }
}
