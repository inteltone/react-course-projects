import { useState } from "react"
import useFetch from "use-http"

export function TaskForm({ onCreated }) {
	const [title, setTitle] = useState("")

	const { post, loading, error, response } = useFetch("/todos")

	const handleSubmit = async (event) => {
		event.preventDefault()

		const trimmed = title.trim()
		if (!trimmed || loading) return

		const created = await post({
			title: trimmed,
			completed: false,
			userId: 1,
		})

		if (response && response.ok) {
			onCreated(created)
			setTitle("")
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
				disabled={loading}
			/>
			<button
				className="app-task-form__button"
				type="submit"
				disabled={loading || !title.trim()}
			>
				{loading ? "Отправка..." : "Добавить"}
			</button>
			{error && (
				<p className="app-task-form__error">Ошибка: {error.message}</p>
			)}
		</form>
	)
}