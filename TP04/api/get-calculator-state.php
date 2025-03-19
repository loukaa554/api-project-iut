<?php
// Vérifie si le fichier existe et est lisible
if (!is_readable('etat.json')) {
    http_response_code(500);
    throw new Exception("Erreur Serveur (Fichier non accessible en lecture)");
}

try {
    // Lecture du contenu du fichier
    $state = file_get_contents('etat.json');

    // En-tête pour indiquer que la réponse est en JSON
    header('Content-Type: application/json');

    // Envoi du contenu JSON au client
    echo $state;

} catch (Exception $ex) {
    http_response_code(500);
    throw new Exception("Erreur Serveur (Problème sur le fichier)");
}