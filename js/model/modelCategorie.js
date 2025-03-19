export class modelCategorie {
  /**
   * Nom de la catégorie.
   * @type {string}
   */
  _name;

  /**
   * Description de la catégorie.
   * @type {string}
   */
  _description;

  /**
   * URL de l'image représentant la catégorie.
   * @type {string}
   */
  _image;

  /**
   * Constructeur de la classe ModelCategorie.
   * @param {string} name Nom de la catégorie.
   * @param {string} description Description de la catégorie.
   * @param {string} image URL de l'image de la catégorie.
   */
  constructor(name, description, image) {
    this._name = name ?? "Catégorie inconnue";
    this._description = description ?? "Aucune description disponible.";
    this._image = image ?? "";
  }

  /**
   * Getter de l'attribut _name.
   * @returns {string} Nom de la catégorie.
   */
  getName() {
    return this._name;
  }

  /**
   * Setter de l'attribut _name.
   * @param {string} name Nom de la catégorie.
   */
  setName(name) {
    this._name = name;
  }

  /**
   * Getter de l'attribut _description.
   * @returns {string} Description de la catégorie.
   */
  getDescription() {
    return this._description;
  }

  /**
   * Setter de l'attribut _description.
   * @param {string} description Description de la catégorie.
   */
  setDescription(description) {
    this._description = description;
  }

  /**
   * Getter de l'attribut _image.
   * @returns {string} URL de l'image de la catégorie.
   */
  getImage() {
    return this._image;
  }

  /**
   * Setter de l'attribut _image.
   * @param {string} image URL de l'image de la catégorie.
   */
  setImage(image) {
    this._image = image;
  }
}
