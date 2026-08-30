import { useState } from "react"
import api from "../api/api"

export function TaskItem({ task, onUpdated, onDeleted }) {
	const [busy, setBusy] = useState(false)

	// PUT: полное обновление задачи с переключённым статусом.
	// Локальные задачи (созданные POST-ом) на сервере не существуют —
	// их обновляем только в состоянии.
	const handleToggle = async () => {
		if (busy) return

		if (task.local) {
			onUpdated({ ...task, completed: !task.completed })
			return
		}

		setBusy(true)
		try {
			const response = await api.put(`/todos/${task.id}`, {
				...task,
				completed: !task.completed,
			})
			onUpdated(response.data)
		} catch {
			// Ошибка уже показана тостом в интерсепторе
		} finally {
			setBusy(false)
		}
	}

	// DELETE: удаляем задачу на сервере, потом в состоянии.
	// Локальные задачи удаляем только из состояния.
	const handleDelete = async () => {
		if (busy) return

		if (task.local) {
			onDeleted(task.id)
			return
		}

		setBusy(true)
		try {
			await api.delete(`/todos/${task.id}`)
			onDeleted(task.id)
		} catch {
			// Ошибка уже показана тостом в интерсепторе
		} finally {
			setBusy(false)
		}
	}

	return (
		<li className={"app-task-item" + (task.completed ? " app-task-item_done" : "")}>
			<label className="app-task-item__label">
				<input
					className="app-task-item__checkbox"
					type="checkbox"
					checked={task.completed}
					disabled={busy}
					onChange={handleToggle}
				/>
				<span className="app-task-item__title">{task.title}</span>
			</label>
			<button
				className="app-task-item__delete"
				type="button"
				disabled={busy}
				onClick={handleDelete}
			>
				Удалить
			</button>
		</li>
	)
}
