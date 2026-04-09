import { useState } from 'react'
import { validateName, validateEmail, validate } from './validate.js'

const Form = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		year: ''
	})
	const [touched, setTouched] = useState(false)  // gäller för hela formuläret


	// Joi-validering av hela formulärets data på samma gång. Vi vill ha ett objekt med felmeddelanden för formulärelementen: { name, email }
	const result = validate(formData)
	const nameError = result.name
	const emailError = result.email
	const yearError = result.year

	// ---------- NAMN ----------------------- //
	// Validering av namn-fältet
	// Möjlig förbättring: const { nameCss, nameErrorCss, nameIsValid } = myfunction(touched, nameError)
	let nameCss = ''
	let nameErrorCss = 'error'
	if( touched ) {
		if( nameError ) {
			nameCss = 'invalid'
			nameErrorCss = 'error show'
		} else {
			nameCss = 'valid'
		}
	}
	const nameIsValid = !nameError

	// ---------- E-POST --------------------- //
	// Validering av e-post-fältet
	let emailCss = ''
	let emailErrorCss = 'error'
	if( touched ) {
		if( emailError ) {
			emailCss = 'invalid'
			emailErrorCss = 'error show'
		} else {
			emailCss = 'valid'
		}
	}
	const emailIsValid = !emailError

	// ---------- FÖDELSEÅR-------------------- //
	// Validering av år-fältet
	let yearCss = ''
	let yearErrorCss = 'error'
	if( touched ) {
		if( yearError ) {
			yearCss = 'invalid'
			yearErrorCss = 'error show'
		} else {
			yearCss = 'valid'
		}
	}
	const yearIsValid = !yearError


	const fieldsAreValid = nameIsValid && emailIsValid && yearIsValid
	const formIsValid = !touched || fieldsAreValid
	// ---------- Slut på formulär ------------- //


	const handleSubmit = event => {
		// Indikera att användaren har fått en chans att fylla i formuläret - nu är det fritt fram att visa felmeddelanden
		setTouched(true)

		// Om något har gått fel, avbryt
		if( !fieldsAreValid ) {
			// Stoppa standardhändelsen - submit
			event.preventDefault()
			return
		}

		// Göra saker med formulärdatan - till exempel spara eller skicka till ett API
	}

	return (
		<div className="form">
			<form>

			<section className="form-field">

				<label htmlFor="name"> Namn </label>
				<input id="name"
					className={nameCss}
					onChange={e => setFormData({ ...formData, name: e.target.value })}
					value={formData.name}
					aria-invalid={!nameIsValid}
					aria-describedby="name-error"
					/>
				<p id="name-error" className={nameErrorCss}> {nameError} </p>

				<label htmlFor="email"> E-post </label>
				<input id="email"
					className={emailCss}
					onChange={e => setFormData({ ...formData, email: e.target.value })}
					value={formData.email}
					aria-invalid={!emailIsValid}
					aria-describedby="email-error"
					/>
				<p id="email-error" className={emailErrorCss}> {emailError} </p>

				<label htmlFor="birth-year"> Födelseår </label>
				<input id="birth-year"
					className={yearCss}
					onChange={e => setFormData({ ...formData, year: e.target.value })}
					value={formData.year}
					aria-invalid={!yearIsValid}
					aria-describedby="year-error"
					/>
				<p id="year-error" className={yearErrorCss}> {yearError} </p>

			</section>

			<section className="form-field">
				<button
					type="submit"
					disabled={!formIsValid}
					onClick={handleSubmit}
					> Spara </button>
			</section>

			{/* Detta är som en console.log, ha inte kvar i slutliga versionen av ditt formulär... */}
			<h2> Test av formuläret </h2>
			<p> {formData.name}, {formData.email} </p>

			</form>
		</div>
	)
}

export default Form
