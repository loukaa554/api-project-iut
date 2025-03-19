// Import des boutons éditables
import { EditableButton } from "./modelEditableButton.js";
import { view } from "./view.js";

/**
 * Classe Calculator.
 * (Modèle représentant la calculatrice)
 */
export class Calculator {
  /**
   * Expression actuelle de la calculatrice.
   * @type {string}
   */
  _input;

  /**
   * Mémoire de la calculatrice.
   * @type {{string|null}}
   */
  _memory;

  /**
   * Objet littéral contenant les boutons éditables de la calculatrice.
   * (Clé = ID du bouton, Valeur = Objet EditableButton associé)
   * @type {Object}
   */
  _editableButtons;

  /**
   * Theme
   */
  _theme;

  /**
   * Constructeur de la classe Calculator.
   * @param {Object} editableBtns : Informations sur les boutons éditables.
   */
  constructor(editableBtns) {
    this._input = "";
    this._memory = null;
    this._theme = "os-default";

    // Initialisation des boutons éditables
    // (avec un ID qui commence par "libre" suivi d'un chiffre)
    this._editableButtons = {};
    for (let key in editableBtns) {
      let btn = new EditableButton(key, editableBtns[key]);
      this._editableButtons[key] = btn;
    }
  }

  /**
   * Retourne l'expression actuelle de la calculatrice.
   * @returns {string}
   */
  getInput() {
    return this._input;
  }

  /**
   * Met à jour l'expression actuelle de la calculatrice.
   * @param {string} expr : Nouvelle expression
   */
  setInput(expr) {
    this._input = expr;
  }

  /**
   * Ajoute une expression à l'entrée de la calculatrice.
   * @param {string} expr : Nouvelle expression
   */
  addToInput(expr) {
    if (this._input === "Erreur") {
      this._input = expr;
    } else {
      this._input += expr;
    }
  }

  /**
   * Vide l'entrée de la calculatrice.
   */
  clearInput() {
    this._input = "";
  }

  /**
   * Retourne la liste des IDs des boutons éditables.
   * @returns {Array} La liste des IDs des boutons éditables (une liste de chaînes de caractères).
   */
  getIdsEditablesButtons() {
    return Object.keys(this._editableButtons);
  }

  /**
   * Retourne la valeur d'un bouton éditable.
   * @param {string} idBtn : ID du bouton éditable.
   * @returns {string} La valeur du bouton éditable (ou null, si le bouton n'existe pas).
   */
  getValueEditableButton(idBtn) {
    if (this._editableButtons[idBtn]) {
      return this._editableButtons[idBtn].getValue();
    } else {
      return null;
    }
  }

  setValueEditableButton(idBtn, value) {
    if (this._editableButtons[idBtn]) {
      this._editableButtons[idBtn].setValue(value);
    }
  }

  setTheme(theme) {
    this._theme = theme;
  }

  getTheme() {
    return this._theme;
  }

  calculate(expr) {
    try {
      this._input = eval(expr);
    } catch (error) {
      this._input = "Erreur";
      return "Erreur";
    }
  }

  addToMemory(expr) {
    let onlyNumRegEx = /^-?\d+(\.\d+)?$/;
    if (onlyNumRegEx.test(expr)) {
      this._memory = expr;
    } else {
      throw new Error("Tu peux boss, que des chiffres.");
    }
  }

  getMemory() {
    return this._memory;
  }

  clearMemory() {
    this._memory = null;
  }

  handleTheme() {
    if (this.getTheme() === "os-default") {
      document.body.className = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? "dark"
        : "light";
    } else {
      document.body.className = this.getTheme();
    }
    view.theme.value = this.getTheme();
  }

  // retrieveStateFromClient() {
  //   // Ajout de la mémoire
  //   if (localStorage.getItem("memory")) {
  //     this.addToMemory(localStorage.getItem("memory"));
  //   }

  //   // Ajout des boutons éditables
  //   if (
  //     localStorage.getItem("editableButtons") === null ||
  //     localStorage.getItem("editableButtons") === undefined
  //   ) {
  //     localStorage.setItem(
  //       "editableButtons",
  //       JSON.stringify(this._editableButtons)
  //     );
  //   } else {
  //     const btnsJson = JSON.parse(localStorage.getItem("editableButtons"));
  //     for (let key in btnsJson) {
  //       let btnElt = document.getElementById(key);
  //       if (btnElt) {
  //         btnElt.value = btnsJson[key];
  //       }
  //     }
  //   }
  //   if (localStorage.getItem("theme")) {
  //     this.setTheme(localStorage.getItem("theme"));
  //   }
  // }

  saveStateToServer() {
    console.log(this.getValueEditableButton("libre1"));

    const stateToSend = {
      editableButtons: Object.fromEntries(
        this.getIdsEditablesButtons().map((id) => [
          id,
          this.getValueEditableButton(id),
        ])
      ),
      memory: this.getMemory(),
      theme: this.getTheme(),
    };

    console.log("Données envoyées au serveur :", stateToSend); // Debug

    fetch("http://127.0.0.1:8080/api/save-calculator-state.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        state: JSON.stringify(stateToSend),
      }),
    })
      .then((response) => response.json()) // Vérifier la réponse JSON
      .then((data) => console.log("Réponse du serveur :", data))
      .catch((error) =>
        console.error("❌ Erreur lors de l'envoi des données :", error)
      );
  }

  retrieveStateFromServer() {
    fetch("http://127.0.0.1:8080/api/get-calculator-state.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur de récupération : ${response.status}`);
        }
        return response.json(); // Lire une seule fois
      })
      .then((data) => {
        console.log("Données reçues du serveur :", data); // Vérification des données reçues

        // Mise à jour des boutons éditables
        if (data.editableButtons) {
          const editableButtons = data.editableButtons;
          for (let key in editableButtons) {
            if (this._editableButtons[key]) {
              this._editableButtons[key].setValue(editableButtons[key]);
              const btnElt = document.getElementById(key);
              if (btnElt) {
                btnElt.value = editableButtons[key];
              }
            }
          }
        }

        // Mise à jour de la mémoire
        if (data.memory) {
          this.addToMemory(data.memory);
        }

        // Mise à jour du thème si nécessaire
        if (data.theme) {
          this.setTheme(data.theme);
          if (data.theme === "os-default") {
            document.body.className = window.matchMedia(
              "(prefers-color-scheme: dark)"
            ).matches
              ? "dark"
              : "light";
          } else {
            document.body.className = data.theme;
          }
          view.theme.value = data.theme;
        }

        console.log("🎯 État mis à jour depuis le serveur !");
      })
      .catch((error) =>
        console.error("❌ Erreur lors de la récupération :", error)
      );
  }
}
