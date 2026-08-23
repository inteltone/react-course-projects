import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme()
	const { t } = useLanguage()

	const nextTheme = theme === 'light' ? 'dark' : 'light'

	return (
		<button
			className="app-theme-toggle"
			type="button"
			onClick={toggleTheme}
			aria-label={nextTheme === 'dark' ? t.switchToDark : t.switchToLight}
		>
			{nextTheme === 'dark' ? t.switchToDark : t.switchToLight}
		</button>
	)
}
