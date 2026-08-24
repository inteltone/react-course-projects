import { getUsers } from "../../lib/data"

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Метод не разрешён" })
	}

	const users = await getUsers()
	res.status(200).json(users)
}
