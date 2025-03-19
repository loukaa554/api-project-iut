// Import des modules nécessaires
import { Calculator } from "./modelCalculator.js";
import { view } from "./view.js";

// ### Initialisation du modèle ###
// (à partir du contenu des boutons éditables)
const editableBtnsInfos = {
  libre1: "%",
  libre2: "",
  libre3: "",
  libre4: "",
  libre5: "",
  libre6: "",
};
let calculator = new Calculator(editableBtnsInfos);

/* (La vue est un objet importé du module view.js) */

// ### Initialisation de l'affichage des boutons éditables ###
for (let key of calculator.getIdsEditablesButtons()) {
  // La clé de l'objet correspond à un ID de bouton dans la page
  let btnElt = document.getElementById(key);
  // Si le bouton existe bien, on met à jour sa valeur affichée
  if (btnElt) {
    btnElt.value = calculator.getValueEditableButton(key);
  }
}

// ### Initialisation des listeners ###
// - Gestion de la saisie au clavier
view.calcInput.addEventListener("keyup", (evt) => {
  // Informe le modèle du changement
  calculator.setInput(evt.target.value);
  // (La vue n'a pas besoin d'être mis à jour ici)
});

// - Gestion du bouton CE
// (qui vide la champ de la calculatrice)
view.ceBtn.addEventListener("click", function () {
  // Informe le modèle du changement
  calculator.clearInput();
  // Mise à jour de l'affichage
  view.calcInput.value = calculator.getInput();
});

// - Gestion du bouton <-
// (qui vide la champ de la calculatrice)
view.DelBtn.addEventListener("click", function () {
  view.calcInput.value = view.calcInput.value.slice(0, -1);
  calculator.setInput(view.calcInput.value);
});

// - Gestion des boutons simples 1,2,3...
let classicClickListener = function (event) {
  calculator.addToInput(event.target.value);
  view.calcInput.value = calculator.getInput();
  calculator.setInput(view.calcInput.value);
};

for (let btn of view.SimpleButtons) {
  btn.addEventListener("click", classicClickListener);
}

// - Gestion du bouton =
view.CalcBtn.addEventListener("click", function () {
  calculator.calculate(view.calcInput.value);
  view.calcInput.value = calculator.getInput();
  calculator.setInput(view.calcInput.value);
});

// - Gestion du bouton MS
view.MsBtn.addEventListener("click", function () {
  try {
    view.error.textContent = "";
    calculator.addToMemory(view.calcInput.value);
    calculator.saveStateToServer();
  } catch (e) {
    view.error.textContent = e;
  }
});

// - Gestion du bouton MR
view.MrBtn.addEventListener("click", function () {
  let memory = calculator.getMemory();
  if (memory) {
    view.calcInput.value = calculator.getInput() + memory;
    calculator.setInput(view.calcInput.value);
  }
});

// - Gestion du bouton MC
view.McBtn.addEventListener("click", function () {
  calculator.clearMemory();
});

// - Gestion des boutons éditables
let editableClickListener = function (event) {
  console.log("first");
  if (!view.EditableButton.checked) {
    calculator.addToInput(event.target.value);
    view.calcInput.value = calculator.getInput();
    calculator.setInput(view.calcInput.value);
  }
};

for (let btn of view.EditableButtons) {
  btn.addEventListener("click", editableClickListener);
}

// - Gestion du bouton Editable
view.EditableButton.addEventListener("change", function () {
  let isEditable = view.EditableButton.checked;
  const btnsJson = {};
  for (let btn of view.EditableButtons) {
    if (isEditable) {
      btnsJson[btn.id] = btn.value;
      calculator.setValueEditableButton(btn.id, btn.value);
      btn.type = "text";
      btn.classList.add("active");
    } else {
      btnsJson[btn.id] = btn.value;
      calculator.setValueEditableButton(btn.id, btn.value);
      btn.type = "button";
      btn.classList.remove("active");
    }
  }
  calculator.saveStateToServer();
});

// - Zone d'affichage
view.display.addEventListener("dblclick", function () {
  if (view.main.firstChild === view.display) {
    view.main.appendChild(view.display);
  } else {
    view.main.insertBefore(view.display, view.main.firstChild);
  }
});

// ### Initialisation du localStorage ###
// calculator.retrieveStateFromClient();
calculator.handleTheme();

// ### Gestion du thème ###
view.theme.addEventListener("change", function (event) {
  calculator.setTheme(event.target.value);
  calculator.handleTheme();
  calculator.saveStateToServer();
});

// ### Gérer élement drag and drop ###
// Sélectionner les éléments
// Ajouter un événement pour démarrer le drag
for (let draggable of view.draggables) {
  draggable.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text", event.target.id);
  });
}

calculator.retrieveStateFromServer();
