<?php
require "include/init_twig.php";
include_once("include/_connexion.php");
require_once "include/_functions.php";
require_once "include/_functionsJS.js";

$pdo = getPDO();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//if (isset($_POST['submit'])) {
  $companyName = strip_tags($_POST['companyName']);
  $contactPerson = strip_tags($_POST['contactPerson']);
  $email = strip_tags($_POST['email']);
  $tel = strip_tags($_POST['tel']);
  $town = strip_tags($_POST['town']);
  $service = $_POST['service'];
  $surface = strip_tags($_POST['surface']);
  $frequency = $_POST['frequency'];
  $description = strip_tags($_POST['description']);
  $pattern = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i";


  if (empty(trim($contactPerson))) {
    $errorMsg = "Le nom de la personne à contacter est laissé vide";
  }elseif(!preg_match($pattern, $email)){
    $errorMsg = "Adresse mail invalide ou laissé vide !!!!!!!";
  }elseif(!preg_match("/^\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$/", $tel)){
    $errorMsg = "Numéro de téléphone invalide ou laissé vide";
  }elseif(empty(trim($town))){
    $errorMsg = "La ville est laissé vide";
  }elseif(empty($service)){
    $errorMsg = "Veuillez choisir un service svp";
  }elseif(!is_numeric($surface)){
    $errorMsg = "Veuillez entrez une superficie valide";
  }elseif(!$frequency){
    $errorMsg = "Veuillez choisir la fréquence d'intervention";
  }elseif(!$description){
    $errorMsg = "Veuillez nous décrire votre demande";
  }else {
    $dateMessage = date('Y-m-d');
    $devis = $pdo->prepare("INSERT INTO devis(dateMessage, companyName, contactPerson, email, tel, town, desiredService, surface, frequency, description) VALUES (?,?,?,?,?,?,?,?,?,?)");
    $devis->execute([$dateMessage, $companyName, $contactPerson, $email, $tel, $town, $service, $surface, $frequency, $description]);
    $errorMsg = "Votre demande à été bien envoyé, nous vous répondrons dans les plus bref délais";
  }

  if (isset($errorMsg)) {
    header("Location: devis.php?message=$errorMsg"); //Afficher le message de succès ou d'erreur si il y a un ou des erreurs lors d'envoie du formulaire
    die();
  }
}

?>
