import { useState } from "react"
import { ThemeContext } from "./ThemeContext"

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState("light")

	const toggleTheme = () => {
		setTheme((current) => (current === "light" ? "dark" : "light"))
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
