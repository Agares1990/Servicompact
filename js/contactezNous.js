$( document ).ready( function ()
	{
		// Expression régulière des champs (nom/sujet/message).
		const regex1 = /^[a-zA-Z ]{2,30}$/;

		// Expression régulière du champ email.
		const regex2 = /^(([^<>()\[\]\\.,;:\s@"]+( \.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Expression régulière du champ tel.
    const regex3 =  /[0-9]*/gm;

		// si le formulaire est correct, retourne 'true'
		// sinon affiche le message adéquat

		function checkForm()
		{

			// Vérification des champs formulaires
			const name = $( "input[name = 'name']" ).val();
		  const mail = $( "input[name = 'email']" ).val();
		  const tel = $( "input[name = 'tel']" ).val();
		  const subject = $( "input[name = 'subject']" ).val();
		  const message = $( "textarea[name = 'message']" ).val();

			if ( !regex1.test( name ) || name.trim().length == 0)
			{
				$("#error").text("Votre nom est invalide ou laissé vide");
				return false;
			}
			if ( !regex2.test( mail))
			{
				$("#error").text("Adresse mail invalide ou laissé vide");
				return false;
			}
      if ( !regex3.test( tel))
			{
				$("#error").text("Numéro de téléphone invalide ou laissé vide");
				return false;
			}
			if ( !regex1.test( subject ) || subject.trim().length == 0)
			{
				$("#error").text("Votre sujet est invalide ou laissé vide");
				return false;
			}
			if ( !regex1.test( message ) || message.trim().length == 0)
			{
				$("#error").text("Veuillez écrire votre message");
				return false;
			}

			else {
				$("span").text("")
				$("#success").css("visibility", "visible");
				$("#successMessage").text("Le message a été envoyé avec succès !!!");
				return true;
			}

		}
		// réinitialise le formulaire
		function clearForm()
		{

			$( "textarea" ).val( "" );
			$( "input[type = \"text\"]" ).val( "" );
		}

		// si les données du formulaire sont correctes
		$( "input[type = \"submit\"]" ).click( function(e)
		{
	      e.preventDefault();
				if ( checkForm() )
				{

					// On envoie les données du formulaire via une
					//	requête de type POST.
					$.post( "contactezNous.php",
						{

							// Nom
							name: $( "input[name = 'name']" ).val(),

							// Email
							mail: $( "input[name = 'email']" ).val(),

              // Tel
							tel: $( "input[name = 'tel']" ).val(),

							// Sujet
							subject: $( "input[name = 'subject']" ).val(),

							// Message
							message: $( "textarea[name = 'message']" ).val(),

							//rgpd: $( "input[name = 'RGPD']" ).val()
						}, function(staut, data) {
							console.log(staut, data);
						});
						console.log("string");

					// On supprime les données du formulaire seulement
					//	si toutes les données ont été validées.
					clearForm();
				}
		} );
		// cacher le message du succès lorsqu'on clique sur X (#closebtn)
		$("#closebtn").click(function cacherMessage()
		{
  		$("#success").hide();
		});
	});
