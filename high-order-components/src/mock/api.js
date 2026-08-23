const USERS = [
	{ id: 1, name: "Алексей", email: "alex@example.com", role: "admin" },
	{ id: 2, name: "Мария", email: "maria@example.com", role: "editor" },
	{ id: 3, name: "Иван", email: "ivan@example.com", role: "viewer" },
	{ id: 4, name: "Ольга", email: "olga@example.com", role: "editor" },
]

// Эмуляция запроса к серверу
export function fetchUsers() {
	return new Promise((resolve) => {
		setTimeout(() => resolve([...USERS]), 1200)
	})
}
