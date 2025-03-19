export class modelCategorie {
  /**
   * Nom de la catégorie.
   * @type {string}
   */
  _name;

  /**
   * Constructeur de la classe CategoriesModel.
   * @param {*} name
   * @returns {Array} Liste des recettes
   */
  constructor(name) {
    this._name = name ?? "Catégorie inconnue";
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
   * @param {string} name Nom de l'ingrédient.
   */
  setName(name) {
    this._name = name;
  }
}
