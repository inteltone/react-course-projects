import { Toast } from "./components/Toast"
import { TaskManager } from "./components/TaskManager"

export function App() {
	return (
		<div className="app-page">
			<div className="app-page__header">
				<p className="app-page__title">Axios — менеджер задач</p>
				<p className="app-page__subtitle">
					Экземпляр axios, интерсепторы, CRUD, отмена запросов и тосты ошибок
				</p>
			</div>

			<div className="app-page__body">
				<div className="app-page__section app-page__section_wide">
					<TaskManager />
				</div>
			</div>

			<Toast />
		</div>
	)
}
