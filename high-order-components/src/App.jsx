import { useState } from "react"
import { AuthProvider } from "./context/AuthProvider"
import { useAuth } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeProvider"
import { useTheme } from "./context/ThemeContext"
import { AdminPanel } from "./components/AdminPanel"
import { UserList } from "./components/UserList"
import { Dashboard } from "./components/Dashboard"

const VIEWER_PERMISSIONS = ["view"]
const ADMIN_PERMISSIONS = ["view", "admin"]

function AuthControls() {
	const { isAuthenticated, login, logout } = useAuth()

	return (
		<div className="app-controls">
			<p className="app-controls__label">
				Статус: {isAuthenticated ? "авторизован" : "не авторизован"}
			</p>
			{isAuthenticated ? (
				<button
					className="app-controls__button"
					type="button"
					onClick={logout}
				>
					Выйти
				</button>
			) : (
				<button
					className="app-controls__button"
					type="button"
					onClick={login}
				>
					Войти
				</button>
			)}
		</div>
	)
}

function PermissionControls() {
	const [hasAdmin, setHasAdmin] = useState(true)
	const permissions = hasAdmin ? ADMIN_PERMISSIONS : VIEWER_PERMISSIONS

	return (
		<div className="app-controls">
			<label className="app-controls__switch">
				<input
					type="checkbox"
					checked={hasAdmin}
					onChange={(event) => setHasAdmin(event.target.checked)}
				/>
				Разрешение «admin»
			</label>
			<Dashboard permissions={permissions} />
		</div>
	)
}

function Page() {
	const { theme } = useTheme()

	return (
		<div className={`app-page app-page_${theme}`}>
			<div className="app-page__header">
				<p className="app-page__title">High Order Components</p>
				<p className="app-page__subtitle">
					Фабрика UI-блоков: withAuth, withData, withLoading, withPermission, withTheme
				</p>
			</div>

			<div className="app-page__body">
				<div className="app-page__section">
					<p className="app-page__section-title">
						1. AdminPanel — обёрнут в withAuth
					</p>
					<AuthControls />
					<AdminPanel adminName="Алексей" />
				</div>

				<div className="app-page__section">
					<p className="app-page__section-title">
						2. UserList — обёрнут в withData и withLoading
					</p>
					<UserList title="Список пользователей" />
				</div>

				<div className="app-page__section app-page__section_wide">
					<p className="app-page__section-title">
						3. Dashboard — обёрнут в withTheme и withPermission
					</p>
					<PermissionControls />
				</div>
			</div>
		</div>
	)
}

export function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<Page />
			</ThemeProvider>
		</AuthProvider>
	)
}
