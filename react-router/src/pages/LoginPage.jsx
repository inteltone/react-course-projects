import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function LoginPage() {
	const { isAuthenticated, login } = useAuth()
	const navigate = useNavigate()

	const handleLogin = () => {
		login()
		navigate("/admin")
	}

	if (isAuthenticated) {
		return (
			<div className="app-page-card">
				<h1 className="app-page-card__title">Вы уже авторизованы</h1>
				<p className="app-page-card__text">
					Перейти в{" "}
					<Link to="/admin">админ-панель</Link> или на{" "}
					<Link to="/">главную</Link>.
				</p>
			</div>
		)
	}

	return (
		<div className="app-page-card">
			<h1 className="app-page-card__title">Вход в защищённый раздел</h1>
			<p className="app-page-card__text">
				Для доступа к /admin нужно авторизоваться. Нажмите кнопку —
				демо-вход без пароля.
			</p>
			<button className="app-button" type="button" onClick={handleLogin}>
				Войти
			</button>
		</div>
	)
}
