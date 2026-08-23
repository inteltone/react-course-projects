import { useEffect, useRef, useState } from "react"

const FIELDS = [
	{ name: "name", label: "Имя", placeholder: "Введите имя" },
	{ name: "email", label: "Email", placeholder: "Введите email" },
	{ name: "phone", label: "Телефон", placeholder: "Введите телефон" },
	{ name: "message", label: "Сообщение", placeholder: "Введите сообщение" },
]

export function AutoFocusForm() {
	const inputRefs = useRef([])
	const [status, setStatus] = useState("")

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus()
		}
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()

		const activeIndex = inputRefs.current.findIndex(
			(el) => el === document.activeElement,
		)
		const isLast = activeIndex === FIELDS.length - 1
		const nextIndex = isLast ? 0 : activeIndex + 1

		inputRefs.current[nextIndex].focus()
		setStatus(
			isLast
				? "Форма отправлена"
				: `Фокус переключён на поле «${FIELDS[nextIndex].label}»`,
		)
	}

	return (
		<form className="app-form" onSubmit={handleSubmit}>
			{FIELDS.map((field, index) => (
				<div className="app-form__field" key={field.name}>
					<label className="app-form__label" htmlFor={`app-form-${field.name}`}>
						{field.label}
					</label>
					<input
						ref={(el) => {
							inputRefs.current[index] = el
						}}
						className="app-form__input"
						id={`app-form-${field.name}`}
						name={field.name}
						placeholder={field.placeholder}
					/>
				</div>
			))}

			<button className="app-form__button" type="submit">
				Далее
			</button>

			{status && <p className="app-form__status">{status}</p>}
		</form>
	)
}
