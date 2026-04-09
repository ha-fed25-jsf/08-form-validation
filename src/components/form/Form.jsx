import { useState } from 'react'
import { validateName, validateEmail } from './validate.js'

const Form = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: ''
	})
	const [touched, setTouched] = useState(false)  // gäller för hela formuläret

	// ---------- NAMN ----------------------- //
	// Validering av namn-fältet
	const nameError = validateName(formData.name)
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
	const nameIsValid = nameError === ''

	// ---------- E-POST --------------------- //
	// Validering av e-post-fältet
	const emailError = validateEmail(formData.email)
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
	const emailIsValid = emailError === ''


	const fieldsAreValid = nameIsValid && emailIsValid
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
