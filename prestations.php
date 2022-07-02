<?php
  require "include/init_twig.php";
  $css = "stylePrestations";
  $script = "prestations";
  $title = "Nos prestations";

  echo $twig->render('prestations.html.twig',
    	  array('css' => $css,
              'script' => $script,
              'title' => $title,
    				));

?>
