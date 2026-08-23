import { Component } from "react"

// ErrorBoundary — классовый компонент-«ловушка» для ошибок.
// Отлавливает ошибки рендера, жизненного цикла и конструкторов
// в дочерних компонентах, вместо того чтобы ронять всё приложение.
export class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false, error: null, errorInfo: null }
	}

	// Обновляем состояние, чтобы показать fallback
	static getDerivedStateFromError(error) {
		return { hasError: true, error }
	}

	// Логируем ошибку в консоль (здесь же можно отправить её в аналитику)
	componentDidCatch(error, errorInfo) {
		this.setState({ errorInfo })
		console.error("Ошибка в компоненте:", error)
		console.error("Информация об ошибке:", errorInfo)
	}

	// Сброс ошибки: возвращаем дочерние компоненты на экран
	resetError = () => {
		this.setState({ hasError: false, error: null, errorInfo: null })
	}

	render() {
		if (!this.state.hasError) {
			return this.props.children
		}

		const { fallback } = this.props
		const fallbackProps = {
			error: this.state.error,
			errorInfo: this.state.errorInfo,
			reset: this.resetError,
		}

		// Кастомный fallback из пропа, если передан
		if (typeof fallback === "function") {
			return fallback(fallbackProps)
		}

		// Дефолтный fallback
		return (
			<div className="app-boundary">
				<h2 className="app-boundary__title">Что-то пошло не так</h2>
				<p className="app-boundary__message">
					Произошла ошибка. Попробуйте обновить страницу или нажмите кнопку ниже.
				</p>
				{import.meta.env.DEV && (
					<details className="app-boundary__details">
						<summary>Детали ошибки</summary>
						<pre className="app-boundary__trace">
							{this.state.error?.toString()}
						</pre>
						<pre className="app-boundary__trace">
							{this.state.errorInfo?.componentStack}
						</pre>
					</details>
				)}
				<button
					className="app-boundary__button"
					type="button"
					onClick={this.resetError}
				>
					Попробовать снова
				</button>
			</div>
		)
	}
}
