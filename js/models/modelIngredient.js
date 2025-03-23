export class IngredientModel {
  /**
   * Constructeur de la classe IngredientModel.
   * @param {string} name
   * @param {string} small
   * @param {string} medium
   * @param {string} large
   * @param {string} url
   * @param {string} description
   */
  constructor(name, description, url) {
    this._name = name ?? "Ingrédient inconnu";
    this._url = url ?? "";
    this._small = `https://www.themealdb.com/images/ingredients/${this._name.toLowerCase()}-small.png`;
    this._medium = `https://www.themealdb.com/images/ingredients/${this._name.toLowerCase()}-medium.png`;
    this._large = `https://www.themealdb.com/images/ingredients/${this._name.toLowerCase()}-large.png`;
    this._description = description ?? "";
  }

  // Getters
  getName() {
    return this._name;
  }

  getUrl() {
    return this._url;
  }

  getSmall() {
    return this._small;
  }

  getMedium() {
    return this._medium;
  }

  getLarge() {
    return this._large;
  }

  getDescription() {
    return this._description;
  }

  // Setters
  setName(name) {
    this._name = name;
  }

  setUrl(url) {
    this._url = url;
  }

  setSmall(image) {
    this._small = image;
  }

  setMedium(image) {
    this._medium = image;
  }

  setLarge(image) {
    this._large = image;
  }

  setDescription(description) {
    this._description = description;
  }
}
