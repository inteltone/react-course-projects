import { ErrorBoundary } from "./components/ErrorBoundary"
import { RenderBug } from "./components/RenderBug"
import { EventBug } from "./components/EventBug"
import { AsyncDemo } from "./components/AsyncDemo"

// Кастомный fallback для Error Boundary: виджет не сломал страницу,
// а показал свою заглушку с кнопкой сброса.
function WidgetFallback({ error, reset }) {
	return (
		<div className="app-widget-fallback">
			<p className="app-widget-fallback__title">Виджет не загрузился</p>
			<p className="app-widget-fallback__error">Ошибка: {error.message}</p>
			<button
				className="app-widget-fallback__button"
				type="button"
				onClick={reset}
			>
				Перезагрузить виджет
			</button>
		</div>
	)
}

function Page() {
	return (
		<div className="app-page">
			<div className="app-page__header">
				<p className="app-page__title">Error Boundaries</p>
				<p className="app-page__subtitle">
					Ловим ошибки рендера, обработчиков событий и асинхронных операций
				</p>
			</div>

			<div className="app-page__body">
				<div className="app-page__section">
					<p className="app-page__section-title">
						1. ErrorBoundary с дефолтным fallback (локальная ловушка)
					</p>
					<ErrorBoundary>
						<RenderBug />
					</ErrorBoundary>
				</div>

				<div className="app-page__section">
					<p className="app-page__section-title">
						2. ErrorBoundary с кастомным fallback через проп
					</p>
					<ErrorBoundary
						fallback={({ error, reset }) => (
							<WidgetFallback error={error} reset={reset} />
						)}
					>
						<RenderBug />
					</ErrorBoundary>
				</div>

				<div className="app-page__section">
					<p className="app-page__section-title">
						3. SafeComponent — ошибки в обработчиках событий
					</p>
					<EventBug />
				</div>

				<div className="app-page__section">
					<p className="app-page__section-title">
						4. useAsyncSafe — ошибки в асинхронном коде
					</p>
					<AsyncDemo />
				</div>
			</div>
		</div>
	)
}

export function App() {
	// Глобальная ловушка на уровне всего приложения:
	// если упадёт вся страница, пользователь увидит fallback,
	// а не белый экран.
	return (
		<ErrorBoundary>
			<Page />
		</ErrorBoundary>
	)
}
