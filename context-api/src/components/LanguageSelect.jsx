import { useLanguage } from '../contexts/LanguageContext'

export function LanguageSelect() {
	const { language, setLanguage } = useLanguage()

	return (
		<select
			className="app-language-select"
			value={language}
			onChange={(event) => setLanguage(event.target.value)}
			aria-label={language === 'ru' ? 'Язык' : 'Language'}
		>
			<option value="ru">RU</option>
			<option value="en">EN</option>
		</select>
	)
}
