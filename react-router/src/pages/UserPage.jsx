import { Link, useLoaderData, useParams } from "react-router-dom"

export function UserPage() {
	const { userId } = useParams()
	const user = useLoaderData()

	return (
		<div className="app-page-card">
			<h1 className="app-page-card__title">Профиль пользователя</h1>
			<p className="app-page-card__text">
				Идентификатор из URL (useParams): <strong>{userId}</strong>
			</p>
			<p className="app-page-card__text">
				Данные загружены loader-ом до рендера (useLoaderData):
			</p>
			<ul className="app-user">
				<li className="app-user__row">
					<span className="app-user__label">Имя:</span>
					<span className="app-user__value">{user.name}</span>
				</li>
				<li className="app-user__row">
					<span className="app-user__label">Email:</span>
					<span className="app-user__value">{user.email}</span>
				</li>
			</ul>
			<p className="app-page-card__hint">
				Попробуйте другие профили:{" "}
				<Link to="/users/2">пользователь 2</Link>,{" "}
				<Link to="/users/3">пользователь 3</Link>, или{" "}
				<Link to="/users/99">несуществующий (404)</Link>.
			</p>
		</div>
	)
}
