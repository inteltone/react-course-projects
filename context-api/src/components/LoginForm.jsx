import { useState } from 'react'
import { useAuth } from '../contexts/UserContext'
import { useLanguage } from '../contexts/LanguageContext'

export function LoginForm() {
	const { login, loading } = useAuth()
	const { t } = useLanguage()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		login(email, password)
	}

	return (
		<form className="app-login-form" onSubmit={handleSubmit} noValidate>
			<label className="app-form-field">
				<span className="app-form-field__label">{t.email}</span>
				<input
					className="app-form-field__input"
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder="user@example.com"
					required
				/>
			</label>

			<label className="app-form-field">
				<span className="app-form-field__label">{t.password}</span>
				<input
					className="app-form-field__input"
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					placeholder="••••••"
					required
				/>
			</label>

			<button className="app-button" type="submit" disabled={loading}>
				{loading ? t.loggingIn : t.login}
			</button>
		</form>
	)
}
