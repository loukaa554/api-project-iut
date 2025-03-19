/**
 * Objet constant représentant la vue.
 */
export const view = {
  // Champ de la calculatrice
  calcInput: document.getElementById("zone_affichage"),

  // Bouton CE
  ceBtn: document.querySelector("input[value='CE']"),

  // Bouton <-
  DelBtn: document.getElementById("backspace"),

  // Bouton simple
  SimpleButtons: document.getElementsByClassName("bouton_simple"),

  // Bouton =
  CalcBtn: document.querySelector("input[value='=']"),

  // Bouton MS
  MsBtn: document.querySelector("input[value='MS']"),

  // Bouton MR
  MrBtn: document.querySelector("input[value='MR']"),

  // Bouton MC
  McBtn: document.querySelector("input[value='MC']"),

  // Boutons Editable
  EditableButtons: document.querySelectorAll("input[id^='libre']"),

  // Bouton Editable
  EditableButton: document.getElementById("editionCheckbox"),

  // Zone d'affichage
  display: document.getElementById("ligne_affichage"),

  // Main
  main: document.getElementById("calc"),

  // Theme
  theme: document.getElementById("theme"),

  // Error
  error: document.getElementById("error"),

  // Élements draggable
  draggables: document.querySelectorAll(".draggable"),
};
