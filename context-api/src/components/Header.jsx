import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/UserContext'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSelect } from './LanguageSelect'

export function Header() {
	const { theme } = useTheme()
	const { language, t } = useLanguage()
	const { user } = useAuth()

	return (
		<header className="app-header">
			<div className="app-header__brand">
				<p className="app-header__title">Context API</p>
				<p className="app-header__status">
					{t.theme}: {theme === 'light' ? t.light : t.dark} · {t.language}:{" "}
					{language.toUpperCase()}
				</p>
			</div>

			<div className="app-header__controls">
				<span className="app-header__user">{user ? user.name : t.guest}</span>
				<ThemeToggle />
				<LanguageSelect />
			</div>
		</header>
	)
}
