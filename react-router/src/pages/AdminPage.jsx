import { useAuth } from "../context/AuthContext"

export function AdminPage() {
	const { logout } = useAuth()

	return (
		<div className="app-page-card">
			<h1 className="app-page-card__title">Админ-панель</h1>
			<p className="app-page-card__text">
				Этот раздел защищён: он доступен только при isAuthenticated ===
				true. Без авторизации ProtectedRoute перенаправляет на /login.
			</p>
			<p className="app-page-card__text">
				Вы авторизованы и видите содержимое админки.
			</p>
			<button className="app-button" type="button" onClick={logout}>
				Выйти
			</button>
		</div>
	)
}
