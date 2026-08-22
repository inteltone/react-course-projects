import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export function ThemeToggle() {
	const { theme, toggleTheme } = useContext(ThemeContext)

	return (
		<button className="theme-toggle" onClick={toggleTheme}>
			{theme === "light" ? "Тёмная тема" : "Светлая тема"}
		</button>
	)
}
