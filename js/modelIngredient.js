import { view } from "./view.js";

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
   * Image de l'ingrédient.
   * @type {string}
   *
   */
  _image;

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
  constructor(name, url, image, description) {
    this._name = name ?? "Ingrédient inconnu";
    this._url = url ?? "";
    this._image = image ?? "";
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
  getImage() {
    return this._image;
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
  setImage(image) {
    this._image = image;
  }

  /**
   * Setter de l'attribut _description.
   * @param {string} description Description de l'ingrédient.
   */
  setDescription(description) {
    this._description = description;
  }
}
