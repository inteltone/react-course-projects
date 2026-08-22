import { useState } from 'react'
import './form-add.scss'
import { DEPARTMENTS } from '../../data/employees'
import Input from '../input/Input'

const emptyForm = {
	name: '',
	department: DEPARTMENTS[0],
	position: '',
}

export default function FormAdd({ onAddEmployee }) {
	// Состояние формы нужно только самой форме, поэтому живёт здесь.
	const [form, setForm] = useState(emptyForm)
	// attempt меняется на каждой неудачной отправке — по нему меняется key
	// сообщения, React монтирует новый узел, и анимация проигрывается заново.
	const [error, setError] = useState(null)

	function handleChange(e) {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	function handleSubmit(e) {
		e.preventDefault()

		const employee = {
			name: form.name.trim(),
			department: form.department,
			position: form.position.trim(),
		}

		if (!employee.name || !employee.position) {
			setError(prev => ({
				text: 'Заполните все поля!',
				attempt: (prev?.attempt ?? 0) + 1,
			}))
			return
		}

		// Форма не знает, как хранится список — только сообщает о событии.
		onAddEmployee(employee)
		setForm(emptyForm)
		setError(null)
	}

	return (
		<form className="form-add" onSubmit={handleSubmit}>
			<fieldset>
				<Input
					type="text"
					name="name"
					value={form.name}
					placeholder="Имя сотрудника"
					onChange={handleChange}
				/>
				<select name="department" value={form.department} onChange={handleChange}>
					{DEPARTMENTS.map(item => (
						<option value={item} key={item}>
							{item}
						</option>
					))}
				</select>
				<Input
					type="text"
					name="position"
					value={form.position}
					placeholder="Должность"
					onChange={handleChange}
				/>
			</fieldset>
			<button type="submit" className="form-add__btn">
				Добавить
			</button>
			{error && (
				<p
					key={error.attempt}
					className="form-add__error rubberBand"
					role="alert"
				>
					{error.text}
				</p>
			)}
		</form>
	)
}
