<?php
require "include/init_twig.php";
include_once("include/_connexion.php");
require_once "include/_functions.php";

$pdo = getPDO();
echo "dddddddd";
if (isset($_POST['submit'])) {
  // $companyName = htmlspecialchars($_POST['companyName'], ENT_QUOTES);
  // $contactPerson = htmlspecialchars($_POST['contactPerson'], ENT_QUOTES);
  // $email = htmlspecialchars($_POST['email'], ENT_QUOTES);
  // $tel = htmlspecialchars($_POST['tel'], ENT_QUOTES);
  // $town = htmlspecialchars($_POST['town'], ENT_QUOTES);
  // $service = htmlspecialchars($_POST['service'], ENT_QUOTES);
  // $surface = htmlspecialchars($_POST['surface'], ENT_QUOTES);
  // $frequency = htmlspecialchars($_POST['frequency'], ENT_QUOTES);
  // $description = htmlspecialchars($_POST['description'], ENT_QUOTES);
  $companyName = $_POST['companyName'];
  $contactPerson = $_POST['contactPerson'];
  $email = $_POST['email'];
  $tel = $_POST['tel'];
  $town = $_POST['town'];
  $service = $_POST['service'];
  $surface = $_POST['surface'];
  $frequency = $_POST['frequency'];
  $description = $_POST['description'];

  if (empty(trim($contactPerson))) {
  $errorMsg = "Le nom de la personne à contacter est laissé vide";
  }
  elseif(!domain_exists($email)){
    $errorMsg = "Adresse mail invalide ou laissé vide";
  }elseif(!(preg_match('/^[0-9]{10}+$/', $tel))){
    $errorMsg = "Numéro de téléphone invalide ou laissé vide";
  }elseif(empty(trim($town))){
    $errorMsg = "La ville est laissé vide";
  }elseif(!$service){
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
