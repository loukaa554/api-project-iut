export class modelArea {
  /**
   * Nom du pays.
   * @type {string}
   */
  _name;

  /**
   * Constructeur de la classe AreaModel.
   * @param {*} name
   * @returns {Array} Liste des recettes
   */
  constructor(name) {
    this._name = name ?? "Pays inconnu";
  }

  /**
   * Getter de l'attribut _name.
   * @returns {string} Nom du pays.
   */
  getName() {
    return this._name;
  }

  /**
   * Setter de l'attribut _name.
   * @param {string} name Nom du pays.
   */
  setName(name) {
    this._name = name;
  }
}
