<?php
require "include/init_twig.php";
include_once("include/_connexion.php");
require_once "include/_functions.php";

$pdo = getPDO();

// if (isset($_POST['submit'])) {
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $name = strip_tags($_POST['name']);
  $email = strip_tags($_POST['email']);
  $tel = strip_tags($_POST['tel']);
  $subject = strip_tags($_POST['subject']);
  $msg = strip_tags($_POST['message']);
  $pattern = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i";
  //$rgpd = $_POST['RGPD'];

//  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (empty(trim($name))) {
    $errorMsg = "Le nom est laissé vide";
  }elseif((empty(trim($email)))) {
    $errorMsg = "Adresse mail laissé vide";
  }elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    $errorMsg = "Adresse mail invalide ou laissé vide";
  }elseif(!(preg_match('/^[0-9]{10}+$/', $tel))){
    $errorMsg = "Numéro de téléphone invalide ou laissé vide";
  }elseif(empty(trim($subject))){
    $errorMsg = "Le champs sujet est laissé vide";
  }elseif(empty(trim($msg))){
    $errorMsg = "Le champs message est laissé vide";
  }
  else {
    $dateMessage = date('Y-m-d');
    $req = $pdo->prepare("INSERT INTO contactus(dateMessage, name, email, tel, subject, message) VALUES (?,?,?,?,?,?)");
    $req->execute([$dateMessage, $name, $email, $tel, $subject, $msg]);
    $errorMsg = "Votre message à été bien envoyé, nous vous répondrons dans les plus bref délais";
  //}
}
  if (isset($errorMsg)) {
    header("Location: contactezNous.php?message=$errorMsg"); //Afficher le message de succès ou d'erreur si il y a un ou des erreurs lors d'envoie du formulaire
    die();
  }
 }
//

?>
