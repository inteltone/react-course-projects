import { useAuth } from '../contexts/UserContext'
import { useLanguage } from '../contexts/LanguageContext'

export function Profile() {
	const { user, logout } = useAuth()
	const { t } = useLanguage()

	if (!user) {
		return null
	}

	return (
		<div className="app-profile">
			<p className="app-profile__greeting">
				{t.welcome} <strong>{user.name}</strong>!
			</p>
			<p className="app-profile__email">{user.email}</p>
			<button className="app-button app-button--ghost" type="button" onClick={logout}>
				{t.logout}
			</button>
		</div>
	)
}
