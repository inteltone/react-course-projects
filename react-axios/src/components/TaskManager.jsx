import { useEffect, useState } from "react"
import api from "../api/api"
import { TaskForm } from "./TaskForm"
import { TaskFilter } from "./TaskFilter"
import { TaskItem } from "./TaskItem"
import { Pagination } from "./Pagination"

const PAGE_SIZE = 10

export function TaskManager() {
	const [tasks, setTasks] = useState([])
	const [total, setTotal] = useState(0)
	const [page, setPage] = useState(1)
	const [filter, setFilter] = useState("all")
	const [loading, setLoading] = useState(true)

	// GET: загружаем список задач с пагинацией через параметры _page и _limit.
	// AbortController отменяет запрос при размонтировании
	// или при переходе на другую страницу (защита от race conditions).
	useEffect(() => {
		const controller = new AbortController()
		setLoading(true)

		api
			.get("/todos", {
				params: { _page: page, _limit: PAGE_SIZE },
				signal: controller.signal,
			})
			.then((response) => {
				setTasks(response.data)
				// Общее количество задач сервер кладёт в заголовок x-total-count
				setTotal(Number(response.headers["x-total-count"]) || 0)
				setLoading(false)
			})
			.catch((error) => {
				// Отменённые запросы молча игнорируем,
				// остальные уже показаны тостом в интерсепторе
				if (error.code !== "ERR_CANCELED") {
					setLoading(false)
				}
			})

		return () => controller.abort()
	}, [page])

	const pages = Math.ceil(total / PAGE_SIZE)

	// Фильтрация по статусу применяется к загруженной странице
	const visibleTasks = tasks.filter((task) => {
		if (filter === "completed") return task.completed
		if (filter === "active") return !task.completed
		return true
	})

	// POST: сервер вернул задачу с новым id — добавляем её в начало списка.
	// JSONPlaceholder не сохраняет созданные задачи: их id (201+) на сервере
	// не существует, поэтому помечаем их локальными —
	// PUT и DELETE для них делаем без запроса.
	const handleCreated = (created) => {
		setTasks((prev) => [{ ...created, local: true }, ...prev])
		setTotal((prev) => prev + 1)
	}

	const handleUpdated = (updated) => {
		setTasks((prev) =>
			prev.map((task) => (task.id === updated.id ? updated : task))
		)
	}

	const handleDeleted = (id) => {
		setTasks((prev) => prev.filter((task) => task.id !== id))
		setTotal((prev) => Math.max(prev - 1, 0))
	}

	return (
		<div className="app-tasks">
			<TaskForm onCreated={handleCreated} />
			<TaskFilter filter={filter} onChange={setFilter} />

			{loading ? (
				<p className="app-tasks__status">Загрузка...</p>
			) : visibleTasks.length === 0 ? (
				<p className="app-tasks__status">Задач не найдено</p>
			) : (
				<ul className="app-tasks__list">
					{visibleTasks.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
							onUpdated={handleUpdated}
							onDeleted={handleDeleted}
						/>
					))}
				</ul>
			)}

			<Pagination page={page} pages={pages} onChange={setPage} />
		</div>
	)
}
