import { useState } from "react"

function requiredValidation(values) {
	const errors = {}
	Object.entries(values).forEach(([name, value]) => {
		if (String(value).trim() === "") {
			errors[name] = "Обязательное поле"
		}
	})
	return errors
}

export function Form({
	initialValues,
	onSubmit,
	children,
	validate = requiredValidation,
}) {
	const [values, setValues] = useState(initialValues)
	const [errors, setErrors] = useState({})

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target
		const nextValue = type === "checkbox" ? checked : value
		setValues((prev) => ({ ...prev, [name]: nextValue }))
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }))
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const nextErrors = validate(values)
		setErrors(nextErrors)
		if (Object.values(nextErrors).every((error) => !error)) {
			onSubmit(values)
		}
	}

	return children({ values, handleChange, handleSubmit, errors })
}
