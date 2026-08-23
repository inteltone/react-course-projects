import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function navLinkClass({ isActive }) {
	return isActive ? "app-nav__link app-nav__link_active" : "app-nav__link"
}

export function Layout() {
	const { isAuthenticated, logout } = useAuth()
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate("/")
	}

	return (
		<div className="app-page">
			<header className="app-page__header">
				<div className="app-page__header-top">
					<div className="app-page__title-block">
						<p className="app-page__title">Маршрутизация в React</p>
						<p className="app-page__subtitle">
							React Router v6: маршруты, навигация, защищённые страницы
						</p>
					</div>

					<div className="app-auth">
						<p className="app-auth__status">
							Статус: {isAuthenticated ? "авторизован" : "не авторизован"}
						</p>
						{isAuthenticated ? (
							<button
								className="app-button app-button_small"
								type="button"
								onClick={handleLogout}
							>
								Выйти
							</button>
						) : (
							<Link
								className="app-button app-button_small app-button_link"
								to="/login"
							>
								Войти
							</Link>
						)}
					</div>
				</div>

				<nav className="app-nav">
					<NavLink to="/" end className={navLinkClass}>
						Главная
					</NavLink>
					<NavLink to="/about" className={navLinkClass}>
						О нас
					</NavLink>
					<NavLink to="/users/1" className={navLinkClass}>
						Профиль
					</NavLink>
					<NavLink to="/search" className={navLinkClass}>
						Поиск
					</NavLink>
					<NavLink to="/admin" className={navLinkClass}>
						Админка
					</NavLink>
				</nav>
			</header>

			<main className="app-page__body">
				<Outlet />
			</main>

			<footer className="app-page__footer">
				<p className="app-page__footer-text">
					Учебный проект курса React — маршрутизация с react-router-dom
				</p>
			</footer>
		</div>
	)
}
