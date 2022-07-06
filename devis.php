<?php
  require "include/init_twig.php";
  $css = "styleDevis";
  $script = "devis";
  $title = "Demander un devis gratuitement- Servimaroc";

  echo $twig->render('devis.html.twig',
    	  array('css' => $css,
              'script' => $script,
              'title' => $title,
    				));

?>
