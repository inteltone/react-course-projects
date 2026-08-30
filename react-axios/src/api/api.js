import axios from "axios"

// Единая точка доступа к API: baseURL задаётся один раз,
// все запросы в приложении идут через этот экземпляр.
const api = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
})

// Интерсептор запроса: логируем каждый запрос и добавляем токен, если он есть.
api.interceptors.request.use(
	(config) => {
		console.log(
			`[Axios →] ${config.method.toUpperCase()} ${config.baseURL}${config.url}`
		)

		const token = localStorage.getItem("token")
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	(error) => Promise.reject(error)
)

// Интерсептор ответа: логируем статус, а ошибки превращаем в тост.
api.interceptors.response.use(
	(response) => {
		console.log(
			`[Axios ←] ${response.status} ${response.config.method.toUpperCase()} ${response.config.url}`
		)
		return response
	},
	(error) => {
		// Отменённые запросы — не ошибка, тост не показываем
		if (axios.isCancel(error)) {
			console.log(`[Axios ✕] Отменён: ${error.config?.url}`)
			return Promise.reject(error)
		}

		let message = "Неизвестная ошибка"

		if (error.response) {
			// Сервер ответил с ошибкой (4xx/5xx)
			const statusMessages = {
				400: "Неверный запрос",
				401: "Не авторизован",
				403: "Доступ запрещён",
				404: "Ресурс не найден",
				500: "Ошибка сервера",
			}
			message =
				statusMessages[error.response.status] ||
				`Ошибка ${error.response.status}`
			console.error(
				`[Axios ←] Ошибка ${error.response.status}:`,
				error.response.data
			)
		} else if (error.request) {
			// Запрос ушёл, но ответа нет (сеть или таймаут)
			message =
				error.code === "ECONNABORTED"
					? "Превышено время ожидания"
					: "Сервер не отвечает"
			console.error("[Axios ←] Нет ответа от сервера")
		} else {
			// Ошибка при настройке запроса
			message = error.message
			console.error("[Axios ←] Ошибка запроса:", error.message)
		}

		// Компонент Toast подписан на это событие и показывает тост
		window.dispatchEvent(new CustomEvent("api-error", { detail: { message } }))

		return Promise.reject(error)
	}
)

export default api
