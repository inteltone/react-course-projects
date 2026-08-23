import { useAuth } from '../contexts/UserContext'
import { useLanguage } from '../contexts/LanguageContext'
import { LoginForm } from './LoginForm'

export function RequireAuth({ children }) {
	const { user, loading } = useAuth()
	const { t } = useLanguage()

	if (loading) {
		return <p className="app-message">{t.loading}</p>
	}

	if (!user) {
		return (
			<div className="app-auth-required">
				<p className="app-message">{t.loginRequired}</p>
				<LoginForm />
			</div>
		)
	}

	return children
}
