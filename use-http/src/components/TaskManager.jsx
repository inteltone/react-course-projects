import { useEffect, useState } from "react"
import useFetch from "use-http"
import { TaskForm } from "./TaskForm"
import { TaskFilter } from "./TaskFilter"
import { TaskItem } from "./TaskItem"
import { Pagination } from "./Pagination"

const PAGE_SIZE = 10
const TOTAL_TASKS = 200

export function TaskManager() {
	const [page, setPage] = useState(1)
	const [tasks, setTasks] = useState([])
	const [filter, setFilter] = useState("all")
	const [search, setSearch] = useState("")
	const [activeSearch, setActiveSearch] = useState("")

	// На старте и при смене страницы/поиска use-http сам выполнит GET.
	// Параметры _page/_limit кладём прямо в URL — use-http не сериализует
	// объект params автоматически.
	const listUrl = activeSearch
		? `/todos/${activeSearch}`
		: `/todos?_page=${page}&_limit=${PAGE_SIZE}`
	const { data, loading, error, abort } = useFetch(listUrl, {
		data: [],
	}, [activeSearch, page])

	// Синхронизируем ответ с локальным состоянием.
	useEffect(() => {
		if (!data) return
		if (loading) return

		if (activeSearch) {
			setTasks(Array.isArray(data) ? data : [data])
		} else if (Array.isArray(data)) {
			setTasks(data)
		}
	}, [data, loading, activeSearch])

	const isSearch = activeSearch.length > 0

	const handleSearchChange = (event) => {
		const value = event.target.value
		setSearch(value)

		if (value.trim() === "") {
			setActiveSearch("")
			setTasks([])
			return
		}

		const id = Number(value)
		if (!Number.isNaN(id) && id > 0 && id <= 200) {
			setActiveSearch(String(id))
		} else {
			setActiveSearch("")
			setTasks([])
		}
	}

	const handleCancelSearch = () => {
		abort()
		setSearch("")
		setActiveSearch("")
		setTasks([])
	}

	const visibleTasks = tasks.filter((task) => {
		if (!task) return false
		if (filter === "completed") return task.completed
		if (filter === "active") return !task.completed
		return true
	})

	const handleCreated = (created) => {
		setTasks((prev) => [{ ...created, local: true }, ...prev])
		console.log("Создано:", created)
	}

	const handleUpdated = (updated) => {
		setTasks((prev) =>
			prev.map((task) => (task.id === updated.id ? updated : task))
		)
	}

	const handleDeleted = (id) => {
		setTasks((prev) => {
			const next = prev.filter((task) => task.id !== id)
			// Если страница опустела и есть куда откатиться — уменьшаем page.
			// Делаем это вне setState, чтобы не вызывать setState в reducer.
			if (next.length === 0 && page > 1 && !activeSearch) {
				setPage((p) => Math.max(1, p - 1))
			}
			return next
		})
	}

	useEffect(() => {
		if (error) {
			window.dispatchEvent(
				new CustomEvent("api-error", { detail: { message: error.message } })
			)
		}
	}, [error])

	return (
		<div className="app-tasks">
			<TaskForm onCreated={handleCreated} />

			<div className="app-task-search">
				<input
					className="app-task-search__input"
					type="number"
					min="1"
					max="200"
					value={search}
					onChange={handleSearchChange}
					placeholder="Поиск по id задачи (1–200)"
				/>
				{isSearch && (
					<button
						className="app-task-search__cancel"
						type="button"
						onClick={handleCancelSearch}
					>
						Отменить
					</button>
				)}
			</div>

			<TaskFilter filter={filter} onChange={setFilter} />

			{loading ? (
				<p className="app-tasks__status">Загрузка...</p>
			) : error ? (
				<p className="app-tasks__status app-tasks__status_error">
					Ошибка: {error.message}
				</p>
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

			{!isSearch && (
				<Pagination
					page={page}
					pages={Math.ceil(TOTAL_TASKS / PAGE_SIZE)}
					onChange={setPage}
				/>
			)}
		</div>
	)
}