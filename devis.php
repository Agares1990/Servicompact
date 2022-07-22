<?php
require "include/init_twig.php";
include_once("include/_connexion.php");
require_once "include/_functions.php";

$css = "styleDevis";
$script = "devis";
$title = "Demander un devis gratuitement- Servimaroc";

$pdo = getPDO();

if (isset($_GET['message'])) {// On récupére le message d'erreur en php
    $errorMsg =  "{$_GET['message']}";
}
echo $twig->render('devis.html.twig',
  	  array('css' => $css,
            'script' => $script,
            'title' => $title,
            'errorMsg' => @$errorMsg
  				));
?>
