$( document ).ready( function ()
	{

		function showSelectNettoyage() {

			if ($('#service option:selected').val()==='Nettoyage'){
				$('#nettoyage').show();
			}
			else {
				$('#nettoyage').hide();
			}
		}
		 showSelectNettoyage();
		 console.log($('#service').val());
		// Expression régulière des champs (nom/sujet/message).
		const regex1 = /^[a-zA-Z ]{2,30}$/;

		// Expression régulière du dernier champ (email).
		const regex2 = /^(([^<>()\[\]\\.,;:\s@"]+( \.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const regex3 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;


		// si le formulaire est correct, retourne 'true'
		// sinon affiche le message adéquat
		console.log("brahim");
		function checkForm()
		{
			const companyName = $( "input[name = 'companyName']" ).val();
			const contactPerson = $( "input[name = 'contactPerson']" ).val();
			const email = $( "input[name = 'email']" ).val();
			const tel = $( "input[name = 'tel']" ).val();
			const town = $( "input[name = 'town']" ).val();
			const service = $( "select[name = 'service']" ).val();
			const surface = $( "input[name = 'surface']" ).val();
			const frequency = $( "select[name = 'frequency']" ).val();
			const description = $( "textarea[name = 'description']" ).val();

			// Vérification des champs formulaires


			if (!regex1.test( contactPerson ) || contactPerson.trim().length == 0)
			{
				$("#error").text("Le nom de la personne à contacter est laissé vide");
				return false;
			}
			if ( !regex2.test( email))
			{
				$("#error").text("Adresse mail invalide ou laissé vide");
				return false;
			}
      if ( !regex3.test( tel ))
			{
				$("#error").text("Le numéro de téléphone invalide ou laissé vide");
				return false;
			}
			if (town.trim().length == 0)
			{
				$("#error").text("La ville est laissé vide");
				return false;
			}
			if ($("#service option:selected").index() == 0)
			{
				$("#error").text("Veuillez choisir un service svp");
				return false;
			}
			if (isNaN(parseFloat(surface)))
			{
				$("#error").text("Veuillez entrez une superficie valide");
				return false;
			}
      if ($("#frequency option:selected").index() == 0)
			{
				$("#error").text("Veuillez choisir la fréquence d'intervention");
				return false;
			}
      if (description.trim().length == 0)
			{
				$("#error").text("Veuillez nous décrire votre demande");
				return false;
			}
			else {
				$("#error").text("")
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
					$.post( "checkDevis.php",
						{
							// Nom
							companyName: $( "input[name = 'companyName']" ).val(),
							contactPerson: $( "input[name = 'contactPerson']" ).val(),
							email: $( "input[name = 'email']" ).val(),
							tel: $( "input[name = 'tel']" ).val(),
							town: $( "input[name = 'town']" ).val(),
							service: $( "#service option:selected" ).val(),
							surface: $( "input[name = 'surface']" ).val(),
							frequency: $( "#frequency option:selected" ).val(),
							description: $( "textarea[name = 'description']" ).val(),
						}, function(staut, data) {
							 	console.log(staut, data);
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
