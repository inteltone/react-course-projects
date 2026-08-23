import { useState } from "react"
import { AuthContext } from "./AuthContext"

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(
		() => localStorage.getItem("token") !== null
	)

	const login = () => {
		localStorage.setItem("token", "demo-token")
		setIsAuthenticated(true)
	}

	const logout = () => {
		localStorage.removeItem("token")
		setIsAuthenticated(false)
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
