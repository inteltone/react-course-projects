import { useState } from "react"
import { ConfirmationModal } from "./ConfirmationModal"
import { FormModal } from "./FormModal"

export function App() {
	const [confirmOpen, setConfirmOpen] = useState(false)
	const [formOpen, setFormOpen] = useState(false)
	const [result, setResult] = useState("")

	const handleConfirm = () => {
		setResult("Действие подтверждено")
		setConfirmOpen(false)
	}

	const handleSubmit = (values) => {
		setResult(`Отправлено: ${values.name}, ${values.email}`)
		setFormOpen(false)
	}

	return (
		<div className="demo">
			<p className="h3">Собираем приложение из компонентов</p>
			<p>Modal (контейнер), ConfirmationModal и FormModal (специализации).</p>

			<div className="demo-buttons">
				<button className="button button-primary" onClick={() => setConfirmOpen(true)}>
					Открыть подтверждение
				</button>
				<button className="button button-outline" onClick={() => setFormOpen(true)}>
					Открыть форму
				</button>
			</div>

			{result && <p className="result">{result}</p>}

			{confirmOpen && (
				<ConfirmationModal
					message="Вы уверены, что хотите удалить этот файл?"
					onConfirm={handleConfirm}
					onClose={() => setConfirmOpen(false)}
				/>
			)}

			{formOpen && (
				<FormModal
					title="Регистрация"
					fields={[
						{ name: "name", label: "Имя" },
						{ name: "email", label: "Email", type: "email" },
					]}
					onSubmit={handleSubmit}
					onClose={() => setFormOpen(false)}
				/>
			)}
		</div>
	)
}
