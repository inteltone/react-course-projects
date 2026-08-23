import { Link, useRouteError } from "react-router-dom"

export function ErrorPage() {
	const error = useRouteError()

	const message =
		error?.status === 404
			? "Пользователь не найден"
			: error?.message || "Что-то пошло не так"

	return (
		<div className="app-page-card app-page-card_error">
			<h1 className="app-page-card__title">Ошибка загрузки данных</h1>
			<p className="app-page-card__text">{message}</p>
			<Link className="app-button app-button_link" to="/">
				На главную
			</Link>
		</div>
	)
}
