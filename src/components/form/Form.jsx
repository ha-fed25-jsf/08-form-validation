import { useState } from 'react'
import { validateName } from './validate.js'

const Form = () => {
	const [formData, setFormData] = useState({
		name: ''
	})
	const [touched, setTouched] = useState(false)  // gäller för hela formuläret

	// Validering av första fältet
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

	// TODO: validering av e-post


	const fieldsAreValid = nameIsValid // && emailIsValid  // TODO: lägg till kod för e-post här
	const formIsValid = !touched || fieldsAreValid

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
					/>
				<p className={nameErrorCss}> {nameError} </p>

				<label> E-post </label>
				<input />
				<p className="error"> Error! </p>

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
			<p> {formData.name} </p>

			</form>
		</div>
	)
}

export default Form
