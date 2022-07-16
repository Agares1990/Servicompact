<?php
  require "include/init_twig.php";
  include_once("include/_connexion.php");
  require_once "include/_functions.php";

  $css = "styleContactezNous";
  $script = "contactezNous";
  $title = "Contactez-Nous - Servimaroc";

  $pdo = getPDO();
  @$name = strip_tags($_POST['name']);
  @$email = strip_tags($_POST['email']);
  @$tel = strip_tags($_POST['tel']);
  @$subject = strip_tags($_POST['subject']);
  @$msg = strip_tags($_POST['message']);
  $pattern = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i";
  // $name = htmlspecialchars($_POST['name'], ENT_QUOTES);
  // $email = htmlspecialchars($_POST['email'], ENT_QUOTES);
  // $tel = htmlspecialchars($_POST['tel'], ENT_QUOTES);
  // $message = htmlspecialchars($_POST['message'], ENT_QUOTES);
  //
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (empty(trim($name))) {
  $errorMsg = "Le nom est laissé vide";
}elseif(preg_match($pattern, $email)){
    $errorMsg = "Adresse mail invalide ou laissé vide";
  }elseif(!(preg_match('/^[0-9]{10}+$/', $tel))){
    $errorMsg = "Numéro de téléphone invalide ou laissé vide";
  }elseif(empty(trim($subject))){
    $errorMsg = "Le champs sujet est laissé vide";
  }elseif(empty(trim($msg))){
    $errorMsg = "Le champs message est laissé vide";
  }
  // elseif(!isset($_POST['RGPD'])){
  //   $errorMsg = "Veuillez coché la ";
  // }
  else {
    $dateMessage = date('Y-m-d');
    $req = $pdo->prepare("INSERT INTO contactus(dateMessage, name, email, tel, subject, message) VALUES (?,?,?,?,?,?)");
    $req->execute([$dateMessage, $name, $email, $tel, $subject, $msg]);
    $errorMsg = "Votre message à été bien envoyé, nous vous répondrons dans les plus bref délais";
  }
  // if (isset($_GET['message'])) {// On récupére le message d'erreur en php
  //     $errorMsg =  "{$_GET['message']}";
  // }
}
  echo $twig->render('contactezNous.html.twig',
    	  array('css' => $css,
              'script' => $script,
              'title' => $title,
              'errorMsg' => @$errorMsg
    				));

?>
