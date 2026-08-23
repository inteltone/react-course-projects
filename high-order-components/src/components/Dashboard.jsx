import { compose } from "../hoc/compose"
import { withPermission } from "../hoc/withPermission"
import { withTheme } from "../hoc/withTheme"

function DashboardContent({ theme, toggleTheme, permissions }) {
	return (
		<div className="app-dashboard">
			<p className="app-dashboard__title">Дашборд</p>
			<p className="app-dashboard__theme">
				Текущая тема: <strong>{theme}</strong>
			</p>
			<p className="app-dashboard__permissions">
				Ваши разрешения: {permissions.join(", ")}
			</p>
			<ul className="app-dashboard__stats">
				<li className="app-dashboard__stat">Визиты: 1 240</li>
				<li className="app-dashboard__stat">Продажи: 96</li>
				<li className="app-dashboard__stat">Конверсия: 7.7%</li>
			</ul>
			<button className="app-dashboard__button" type="button" onClick={toggleTheme}>
				Переключить тему ({theme === "light" ? "тёмная" : "светлая"})
			</button>
		</div>
	)
}

// withTheme добавляет тему из контекста,
// withPermission проверяет право «admin» перед рендером
export const Dashboard = compose(
	withTheme,
	withPermission(["admin"])
)(DashboardContent)
