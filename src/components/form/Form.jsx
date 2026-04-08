import { useState } from 'react'
import { validateName } from './validate.js'

const Form = () => {
	const [formData, setFormData] = useState({
		name: ''
	})

	const nameError = validateName(formData.name)
	let nameCss = ''
	let nameErrorCss = 'error'
	if( nameError ) {
		nameCss = 'invalid'
		nameErrorCss = 'error show'
	} else {
		nameCss = 'valid'
	}

	return (
		<div className="form">

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

			{/* Detta är som en console.log, ha inte kvar i slutliga versionen av ditt formulär... */}
			<h2> Test av formuläret </h2>
			<p> {formData.name} </p>
		</div>
	)
}

export default Form
