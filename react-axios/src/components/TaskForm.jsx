import { useState } from "react"
import api from "../api/api"

export function TaskForm({ onCreated }) {
	const [title, setTitle] = useState("")
	const [sending, setSending] = useState(false)

	const handleSubmit = async (event) => {
		event.preventDefault()

		const trimmed = title.trim()
		if (!trimmed || sending) return

		setSending(true)
		try {
			// POST: отправляем новую задачу на сервер
			const response = await api.post("/todos", {
				title: trimmed,
				completed: false,
				userId: 1,
			})
			onCreated(response.data)
			setTitle("")
		} catch {
			// Ошибка уже показана тостом в интерсепторе
		} finally {
			setSending(false)
		}
	}

	return (
		<form className="app-task-form" onSubmit={handleSubmit}>
			<input
				className="app-task-form__input"
				type="text"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
				placeholder="Новая задача..."
				disabled={sending}
			/>
			<button
				className="app-task-form__button"
				type="submit"
				disabled={sending || !title.trim()}
			>
				{sending ? "Отправка..." : "Добавить"}
			</button>
		</form>
	)
}
