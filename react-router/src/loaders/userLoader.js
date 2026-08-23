import { fetchUser } from "../mock/api"

export async function userLoader({ params }) {
	const user = await fetchUser(params.userId)

	if (!user) {
		throw new Response("Пользователь не найден", { status: 404 })
	}

	return user
}
