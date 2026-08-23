export function AboutPage() {
	return (
		<div className="app-page-card">
			<h1 className="app-page-card__title">О нас</h1>
			<p className="app-page-card__text">
				Это учебный проект курса React, посвящённый маршрутизации.
				Приложение собрано на react-router-dom v6.
			</p>
			<p className="app-page-card__text">
				На практике разобраны: Routes и Route, Link и NavLink с активным
				стилем, программная навигация через useNavigate, вложенные
				маршруты с Outlet, параметры пути через useParams, query-параметры
				через useLocation, защищённые маршруты и Data Router с loader.
			</p>
		</div>
	)
}
