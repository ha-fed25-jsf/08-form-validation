import Joi from 'joi'

const schema = Joi.object({
	name: Joi.string()
		.min(2)
		// .trim() <- vi kan inte använda trim tillsammans med convert:true
		.pattern(/^\S+.+\S+$/)  // i stället för trim: whitespace inte tillåtna \S i början och slutet
		.required()
		.messages({
			"string.empty": 'Var vänlig och skriv ditt namn.',
			"string.min": 'Skriv ditt fullständiga namn (minst två bokstäver).',
			"string.pattern.base": 'Undvik mellanslag före eller efter ditt namn.'
		}),

	email: Joi.string()
		.email()
		.required()
		.messages({
			"string.email": 'Skriv din e-post på formatet "exempel@domän.com".',
			"string.empty": 'Var vänlig och skriv din e-postadress.',
		}),

	year: Joi.number()
		.required()
		// åldersgräns 13 år: 2026-13 === 2013
		// 2026-126 === 1900
		.max(2013)
		.min(1900)
		.messages({
			"number.base": 'Var vänlig och skriv din ålder.',
			"number.max": 'Du måste vara minst 13 år för att registrera konto.',
			"number.min": 'Du är för gammal för att registrera konto.'
		})
})

// Returnera en lista med felmeddelanden
function validate(formData) {
	const { error } = schema.validate(formData, {
		abortEarly: false,  // för att se alla fel, inte bara det första
		convert: true  // för att omvandla year string->number
	})

	// Om det finns valideringsfel hittar vi meddelandena i error.details[i].message
	if( !error ) {
		return {}
	}

	const result = {}
	error.details.forEach(({ message, path }) => {
		// message är ett felmeddelande, string
		// path är en lista med namn på egenskapen som har felaktigt värde
		const key = path[0]   // kommer vara 'name' eller 'email'
		result[key] = message
	})

	// console.log('Joi validate, result= ', result)
	return result   // {name, email}
}




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



// Returnerar ett informativt, användarvänligt felmeddelande om email är en giltig e-postadress. Annars returnerar den tom sträng.
function validateEmail(input) {
	// Vad är kraven?
	// E-postadress är specificerat i en standard. Vi gör en enklare kontroll: måste ha @, vara icke-tom, inga whitespace.

	if( input.length === 0 ) {
		return 'Var vänlig och skriv din e-postadress.'
	}
	else if( input.includes(' ') ) {
		return 'Inga mellanslag i din e-post tack.'
	}
	else if( !input.includes('@') ) {
		return 'Fel format, e-post måste innehålla @.'
	}
	else {
		return ''  // Good enough!
	}
}

export { validateName, validateEmail, validate }
