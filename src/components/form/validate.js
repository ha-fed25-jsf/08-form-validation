
// Returnerar ett informativt, användarvänligt felmeddelande om input är ett giltigt namn. Annars returnerar den tom sträng.
function validateName(input) {
	// Vad är kraven?
	// User story: som en användare, vill jag mata in mitt namn i ett formulär, så att appen vet vem jag är och kan visa min data.
	// Acceptanskriterier: ett giltigt namn är en sträng på minst två tecken, efter man har tagit bort mellanslag i början och slutet av strängen. (detta är vår definition idag)

	if( input.startsWith(' ') || input.endsWith(' ') ) {
		return 'Undvik mellanslag före eller efter ditt namn.'
	}
	// Använd trim() funktionen om du behöver plocka bort mellanslagen

	else if( input.length === 0 ) {
		return 'Var vänlig och skriv ditt namn.'
	}
	else if( input.length <  2 ) {
		return 'Skriv ditt fullständiga namn (minst två bokstäver).'
	}
	else {
		return ''  // Hurra! Inget felmeddelande!
	}
}


export { validateName }
