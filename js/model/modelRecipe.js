export class RecipeModel {
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
   * Image de la recette.
   * @type {string}
   */
  _image;

  /**
   * Liste des ingrédients de la recette.
   * @type {Array}
   */
  _ingredients;

  /**
   * Pays de la recette.
   * @type {string}
   */
  _country;

  /**
   * Tags de la recette.
   * @type {Array}
   */
  _tags;

  /**
   * Constructeur de la classe RecipeModel.
   * @param {*} ingredient
   * @returns {Array} Liste des recettes
   */
  constructor(name, url, image, ingredients, country, tags) {
    this._name = name ?? "Recette inconnue";
    this._url = url ?? "";
    this._image = image ?? "";
    this._ingredients = ingredients ?? [];
    this._country = country ?? "";
    this._tags = tags ?? [];
  }

  /**
   * Getter de l'attribut _name.
   * @returns {string} Nom de la recette.
   */
  getName() {
    return this._name;
  }

  /**
   * Met à jour l'attribut _name.
   * @param {string} expr : Nouvelle expression
   */
  setName(name) {
    this._name = name;
  }

  /**
   * Getter de l'attribut _url.
   * @returns {string} URL de l'image de la recette.
   */
  getUrl() {
    return this._url;
  }

  /**
   * Met à jour l'attribut _url.
   * @param {string} expr : Nouvelle expression
   */
  setUrl(url) {
    this._url = url;
  }

  /**
   * Getter de l'attribut _image.
   * @returns {string} Nom de la recette.
   */
  getImage() {
    return this._image;
  }

  /**
   * Met à jour l'attribut _image.
   * @param {string} expr : Nouvelle expression
   */
  setImage(image) {
    this._image = image;
  }

  /**
   * Getter de l'attribut _ingredients.
   * @returns {Array} Liste des ingrédients de la recette.
   */
  getIngredients() {
    return this._ingredients;
  }

  /**
   * Met à jour l'attribut _ingredients.
   * @param {Array} expr : Nouvelle expression
   */
  setIngredients(ingredients) {
    this._ingredients = ingredients;
  }

  /**
   * Getter de l'attribut _country.
   * @returns {string} Pays de la recette.
   */
  getCountry() {
    return this._country;
  }

  /**
   * Met à jour l'attribut _country.
   * @param {string} expr : Nouvelle expression
   */
  setCountry(country) {
    this._country = country;
  }

  /**
   * Getter de l'attribut _tags.
   * @returns {Array} Tags de la recette.
   */
  getTags() {
    return this._tags;
  }

  /**
   * Met à jour l'attribut _tags.
   * @param {Array} expr : Nouvelle expression
   */
  setTags(tags) {
    this._tags = tags;
  }
}
