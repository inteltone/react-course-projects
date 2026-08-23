import { withAuth } from "../hoc/withAuth"

function AdminPanelContent({ adminName }) {
	return (
		<div className="app-panel">
			<p className="app-panel__title">Панель администратора</p>
			<p className="app-panel__text">
				Добро пожаловать, {adminName}! Этот блок виден только
				авторизованным пользователям.
			</p>
			<ul className="app-panel__list">
				<li className="app-panel__item">Пользователи: 128</li>
				<li className="app-panel__item">Заказы: 47</li>
				<li className="app-panel__item">Заявки в поддержку: 12</li>
			</ul>
		</div>
	)
}

export const AdminPanel = withAuth(AdminPanelContent)
