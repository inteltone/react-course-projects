import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

const THEMES = ['light', 'dark']

function getInitialTheme() {
	const saved = localStorage.getItem('theme')
	return THEMES.includes(saved) ? saved : 'light'
}

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(getInitialTheme)

	useEffect(() => {
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () =>
		setTheme((current) => (current === 'light' ? 'dark' : 'light'))

	const value = useMemo(() => ({ theme, toggleTheme }), [theme])

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
	const context = useContext(ThemeContext)

	if (!context) {
		throw new Error('useTheme must be used within ThemeProvider')
	}

	return context
}
