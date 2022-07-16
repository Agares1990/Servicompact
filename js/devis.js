$( document ).ready( function ()
	{
		// Expression régulière des champs (nom/sujet/message).
		const regex1 = /^[a-zA-Z ]+$/;

		// Expression régulière du dernier champ (email).
		const regex2 = /^(([^<>()\[\]\\.,;:\s@"]+( \.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const regex3 = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
		
		const companyName = $( "input[name = 'companyName']" ).val();
		const contactPerson = $( "input[name = 'contactPerson']" ).val();
		const email = $( "input[name = 'email']" ).val();
		const tel = $( "input[name = 'tel']" ).val();
		const town = $( "input[name = 'town']" ).val();
		const service = $( "input[name = 'service']" ).val();
		const surface = $( "input[name = 'surface']" ).val();
		const frequency = $( "input[name = 'frequency']" ).val();
		const description = $( "textarea[name = 'description']" ).val();
		// si le formulaire est correct, retourne 'true'
		// sinon affiche le message adéquat
		console.log("brahim");
		function checkForm()
		{


			// Vérification des champs formulaires


			if (!regex1.test( contactPerson ) || contactPerson.trim().length == 0)
			{
				$("#errorContactPerson").text("Le nom de la personne à contacter est laissé vide");
				return false;
			}
			if ( !regex2.test( email))
			{
				$("#errorContactPerson").text("");
				$("#errorMail").text("Adresse mail invalide ou laissé vide");
				return false;
			}
      if ( !regex3.test( tel ))
			{
        $("#errorMail").text("");
				$("#errorTel").text("Le numéro de téléphone invalide ou laissé vide");
				return false;
			}
			if (town.trim().length == 0)
			{
				$("#errorTel").text("");
				$("#errorTown").text("La ville est laissé vide");
				return false;
			}
			if ($("#service option:selected").index() == 0)
			{
				$("#errorTown").text("");
				$("#errorService").text("Veuillez choisir un service svp");
				return false;
			}
			if (isNaN(surface))
			{
				$("#errorService").text("");
				$("#errorSurface").text("Veuillez entrez une superficie valide");
				return false;
			}
      if ($("#frequency option:selected").index() == 0)
			{
				$("#errorSurface").text("");
				$("#errorFrequency").text("Veuillez choisir la fréquence d'intervention");
				return false;
			}
      if (description.trim().length == 0)
			{
				$("#errorFrequency").text("");
				$("#errorDescription").text("Veuillez nous décrire votre demande");
				return false;
			}
			else {
				$("span").text("")
				$("#success").css("visibility", "visible");
				$("#successMessage").text("Votre demande a été envoyé avec succès !");
				return true;
			}

		}
		// réinitialise le formulaire
		function clearForm()
		{
			$( "textarea" ).val( "" );
			$( "input[type = \"text\"]" ).val( "" );
			$( "input[type = \"email\"]" ).val( "" );
			$( "input[type = \"tel\"]" ).val( "" );
		}

		// si les données du formulaire sont correctes
		$( "input[type = \"submit\"]" ).click( function(e)
		{
	      e.preventDefault();
				if ( checkForm() )
				{
					// On envoie les données du formulaire via une
					//	requête de type POST.
					$.post( "devis.php",
						{
							// Nom
							companyName: companyName,
							contactPerson: contactPerson,
							email: email,
							tel: tel,
							town: town,
							service: service,
							surface: surface,
							frequency: frequency,
							description: description,
						// }, function(staut, data) {
						 	// console.log(staut, data);
						});

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
