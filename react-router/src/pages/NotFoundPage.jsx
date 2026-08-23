import { Link } from "react-router-dom"

export function NotFoundPage() {
	return (
		<div className="app-page-card app-page-card_error">
			<h1 className="app-page-card__title">404 — страница не найдена</h1>
			<p className="app-page-card__text">
				По этому адресу ничего нет. Проверьте ссылку или вернитесь на
				главную.
			</p>
			<Link className="app-button app-button_link" to="/">
				На главную
			</Link>
		</div>
	)
}
