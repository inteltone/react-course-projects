import { useState } from "react"
import { Modal } from "./Modal"

export function FormModal({ title, fields, onSubmit, onClose }) {
	const [values, setValues] = useState(() =>
		Object.fromEntries(fields.map((field) => [field.name, ""])),
	)

	const handleChange = (name, value) => {
		setValues({ ...values, [name]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(values)
	}

	return (
		<Modal
			title={title}
			onClose={onClose}
			actions={
				<button className="button button-primary" type="submit" form="form-modal">
					Отправить
				</button>
			}
		>
			<form id="form-modal" className="form" onSubmit={handleSubmit}>
				{fields.map((field) => (
					<label className="form-field" key={field.name}>
						{field.label}
						<input
							type={field.type || "text"}
							name={field.name}
							value={values[field.name]}
							onChange={(e) => handleChange(field.name, e.target.value)}
						/>
					</label>
				))}
			</form>
		</Modal>
	)
}
