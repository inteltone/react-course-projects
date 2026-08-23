import { Link } from "react-router-dom"

export function HomePage() {
	return (
		<div className="app-page-card">
			<h1 className="app-page-card__title">Главная страница</h1>
			<p className="app-page-card__text">
				Это многостраничное приложение на React Router v6. Навигация
				работает без перезагрузки страницы: URL и интерфейс
				синхронизируются автоматически.
			</p>
			<p className="app-page-card__text">Разделы приложения:</p>
			<ul className="app-links">
				<li className="app-links__item">
					<Link to="/about">О нас</Link>
				</li>
				<li className="app-links__item">
					<Link to="/users/1">Профиль пользователя 1</Link>
				</li>
				<li className="app-links__item">
					<Link to="/users/2">Профиль пользователя 2</Link>
				</li>
				<li className="app-links__item">
					<Link to="/search?q=react&page=2">Поиск: «react», стр. 2</Link>
				</li>
				<li className="app-links__item">
					<Link to="/admin">Админ-панель (защищённый раздел)</Link>
				</li>
				<li className="app-links__item">
					<Link to="/no-such-page">Несуществующая страница (404)</Link>
				</li>
			</ul>
		</div>
	)
}
