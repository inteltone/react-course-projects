import { useState } from "react"
import useFetch from "use-http"

export function TaskItem({ task, onUpdated, onDeleted }) {
	const [busy, setBusy] = useState(false)

	// Хук для операций над конкретной задачей
	const { put, del } = useFetch(`/todos/${task.id}`)

	// PUT: переключаем статус выполнения.
	// Локальные задачи (созданные через POST) на сервере не существуют —
	// их обновляем только в состоянии.
	const handleToggle = async () => {
		if (busy) return

		if (task.local) {
			onUpdated({ ...task, completed: !task.completed })
			return
		}

		setBusy(true)
		try {
			const updated = await put({ ...task, completed: !task.completed })
			if (updated) {
				onUpdated(updated)
			}
		} catch {
			// ошибка показана тостом
		} finally {
			setBusy(false)
		}
	}

	// DELETE: удаляем задачу на сервере, потом в состоянии.
	const handleDelete = async () => {
		if (busy) return

		setBusy(true)
		try {
			const result = await del()
			if (result !== null && result !== undefined) {
				onDeleted(task.id)
			}
		} catch {
			// ошибка показана тостом
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
				{busy ? "..." : "Удалить"}
			</button>
		</li>
	)
}