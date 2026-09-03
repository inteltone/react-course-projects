import { Provider } from "use-http"
import { TaskManager } from "./components/TaskManager"
import { Toast } from "./components/Toast"

// Глобальные настройки use-http: единый baseURL,
// тип контента и автоматический повтор при сбоях сети.
const options = {
	headers: {
		"Content-Type": "application/json",
	},
	retries: 3,
	retryDelay: 1000,
	retryOn: [500, 503],
}

export function App() {
	return (
		<Provider url="https://jsonplaceholder.typicode.com" options={options}>
			<div className="app-page">
				<div className="app-page__header">
					<p className="app-page__title">use-http — менеджер задач</p>
					<p className="app-page__subtitle">
						Provider, useFetch, get/post/del, ручная отмена и повторы при ошибках
					</p>
				</div>

				<div className="app-page__body">
					<div className="app-page__section app-page__section_wide">
						<TaskManager />
					</div>
				</div>

				<Toast />
			</div>
		</Provider>
	)
}