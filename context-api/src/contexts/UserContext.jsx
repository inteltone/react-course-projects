import { createContext, useContext, useMemo, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(false)

	const login = async (email, password) => {
		if (!email || !password) {
			return
		}

		setLoading(true)
		try {
			// Имитация запроса к серверу
			await new Promise((resolve) => setTimeout(resolve, 1000))
			const name = email.split('@')[0]
			setUser({
				email,
				name: name.charAt(0).toUpperCase() + name.slice(1),
			})
		} finally {
			setLoading(false)
		}
	}

	const logout = () => {
		setUser(null)
	}

	const value = useMemo(
		() => ({
			user,
			loading,
			login,
			logout,
			isAuthenticated: !!user,
		}),
		[user, loading],
	)

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useAuth() {
	const context = useContext(UserContext)

	if (!context) {
		throw new Error('useAuth must be used within UserProvider')
	}

	return context
}
