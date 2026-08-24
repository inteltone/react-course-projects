const API_URL = "https://jsonplaceholder.typicode.com"

export const mockUsers = [
	{ id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz" },
	{ id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv" },
	{ id: 3, name: "Clementine Bauch", username: "Samantha", email: "Nathan@yesenia.net" },
	{ id: 4, name: "Patricia Lebsack", username: "Karianne", email: "Julianne.OConner@kory.org" },
	{ id: 5, name: "Chelsey Dietrich", username: "Kamren", email: "Lucio_Hettinger@annie.ca" },
	{ id: 6, name: "Mrs. Dennis Schulist", username: "Leopoldo_Corkery", email: "Karley_Dach@jasper.info" },
	{ id: 7, name: "Kurtis Weissnat", username: "Elwyn.Skiles", email: "Telly.Hoeger@billy.biz" },
	{ id: 8, name: "Nicholas Runolfsdottir V", username: "Maxime_Nienow", email: "Sherwood@rosamond.me" },
	{ id: 9, name: "Glenna Reichert", username: "Delphine", email: "Chaim_McDermott@dana.io" },
	{ id: 10, name: "Clementina DuBuque", username: "Moriah.Stanton", email: "Rey.Padberg@karina.biz" },
]

export const mockPosts = [
	{
		id: 1,
		userId: 1,
		title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
		body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
	},
	{
		id: 2,
		userId: 1,
		title: "qui est esse",
		body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
	},
	{
		id: 3,
		userId: 1,
		title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
		body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
	},
	{
		id: 4,
		userId: 1,
		title: "eum et est occaecati",
		body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
	},
	{
		id: 5,
		userId: 1,
		title: "nesciunt quas odio",
		body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
	},
	{
		id: 6,
		userId: 2,
		title: "dolorem eum magni eos aperiam quia",
		body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
	},
]

async function fetchJson(path, fallback) {
	try {
		const response = await fetch(`${API_URL}${path}`)
		if (!response.ok) {
			throw new Error(`Сервер ответил кодом ${response.status}`)
		}
		return await response.json()
	} catch (error) {
		console.warn(`[data] Не удалось получить ${path}: ${error.message}`)
		return fallback
	}
}

export function getPosts() {
	return fetchJson("/posts", mockPosts)
}

export function getPost(id) {
	return fetchJson(`/posts/${id}`, mockPosts.find(post => String(post.id) === String(id)) ?? null)
}

export function getUsers() {
	return fetchJson("/users", mockUsers)
}
