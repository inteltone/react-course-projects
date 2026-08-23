import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

const LANGUAGES = ['ru', 'en']

const translations = {
	ru: {
		theme: 'Тема',
		light: 'Светлая',
		dark: 'Тёмная',
		switchToLight: 'Светлая тема',
		switchToDark: 'Тёмная тема',
		language: 'Язык',
		guest: 'Гость',
		email: 'Email',
		password: 'Пароль',
		login: 'Войти',
		loggingIn: 'Вход...',
		loginRequired: 'Чтобы увидеть профиль, войдите в систему',
		welcome: 'Добро пожаловать,',
		logout: 'Выйти',
		loading: 'Загрузка...',
		cardTitle: 'Личный кабинет',
		status: 'Статус',
		authenticated: 'Авторизован',
		notAuthenticated: 'Не авторизован',
	},
	en: {
		theme: 'Theme',
		light: 'Light',
		dark: 'Dark',
		switchToLight: 'Light theme',
		switchToDark: 'Dark theme',
		language: 'Language',
		guest: 'Guest',
		email: 'Email',
		password: 'Password',
		login: 'Sign in',
		loggingIn: 'Signing in...',
		loginRequired: 'Sign in to see your profile',
		welcome: 'Welcome,',
		logout: 'Sign out',
		loading: 'Loading...',
		cardTitle: 'Account',
		status: 'Status',
		authenticated: 'Authenticated',
		notAuthenticated: 'Not authenticated',
	},
}

function getInitialLanguage() {
	const saved = localStorage.getItem('language')
	return LANGUAGES.includes(saved) ? saved : 'ru'
}

export function LanguageProvider({ children }) {
	const [language, setLanguage] = useState(getInitialLanguage)

	useEffect(() => {
		localStorage.setItem('language', language)
	}, [language])

	const value = useMemo(
		() => ({
			language,
			setLanguage,
			t: translations[language],
		}),
		[language],
	)

	return (
		<LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
	)
}

export function useLanguage() {
	const context = useContext(LanguageContext)

	if (!context) {
		throw new Error('useLanguage must be used within LanguageProvider')
	}

	return context
}
