<?php
  require "include/init_twig.php";
  $css = "styleNosValeurs";
  $script = "nosValeurs";
  $title = "Pourquoi nous choisir";

  echo $twig->render('nosValeurs.html.twig',
    	  array('css' => $css,
              'script' => $script,
              'title' => $title,
    				));

?>
