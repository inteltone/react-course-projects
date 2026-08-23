import { useAuth } from "../context/AuthContext"
import { getDisplayName } from "./getDisplayName"

// HOC для авторизации: берёт статус из контекста авторизации.
// Реактивен — при входе/выходе обёрнутый компонент перерисуется.
export function withAuth(WrappedComponent) {
	function WithAuth(props) {
		const { isAuthenticated } = useAuth()

		if (!isAuthenticated) {
			return (
				<div className="app-access">
					<p className="app-access__title">Пожалуйста, войдите в систему</p>
					<p className="app-access__hint">
						Нажмите «Войти», чтобы увидеть содержимое
					</p>
				</div>
			)
		}

		return <WrappedComponent {...props} />
	}

	WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`

	return WithAuth
}
