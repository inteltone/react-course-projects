import { useCallback, useState } from "react"

function getFieldError(rules, name, value, values) {
	const fieldRules = rules[name]
	if (!fieldRules) return undefined

	for (const rule of fieldRules) {
		const error = rule(value, values)
		if (error) return error
	}
	return undefined
}

function getAllErrors(rules, values) {
	const errors = {}
	for (const name of Object.keys(rules)) {
		const error = getFieldError(rules, name, values[name], values)
		if (error) errors[name] = error
	}
	return errors
}

export function useForm(initialValues = {}, rules = {}) {
	const [values, setValues] = useState(initialValues)
	const [errors, setErrors] = useState({})

	const handleChange = useCallback((event) => {
		const { name, value, type, checked } = event.target
		setValues((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}))
	}, [])

	const handleBlur = useCallback(
		(event) => {
			const { name } = event.target
			setErrors((prev) => ({
				...prev,
				[name]: getFieldError(rules, name, values[name], values),
			}))
		},
		[rules, values],
	)

	const handleSubmit = useCallback(
		(onSubmit) =>
			(event) => {
				event.preventDefault()
				const validationErrors = getAllErrors(rules, values)
				setErrors(validationErrors)
				if (Object.keys(validationErrors).length === 0) {
					onSubmit(values)
				}
			},
		[rules, values],
	)

	const setValue = useCallback((name, value) => {
		setValues((prev) => ({ ...prev, [name]: value }))
	}, [])

	const reset = useCallback(() => setValues(initialValues), [initialValues])

	return { values, errors, handleChange, handleBlur, handleSubmit, setValue, reset }
}
