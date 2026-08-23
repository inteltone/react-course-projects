const USERS = [
	{ id: 1, name: "Алексей", email: "alex@example.com" },
	{ id: 2, name: "Мария", email: "maria@example.com" },
	{ id: 3, name: "Иван", email: "ivan@example.com" },
	{ id: 4, name: "Ольга", email: "olga@example.com" },
]

// Эмуляция запроса к серверу: возвращает пользователя или null
export function fetchUser(id) {
	return new Promise((resolve) => {
		setTimeout(() => {
			const user = USERS.find((item) => String(item.id) === String(id))
			resolve(user || null)
		}, 600)
	})
}
