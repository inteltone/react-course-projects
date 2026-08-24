import Head from "next/head"
import { getPosts, getUsers } from "../lib/data"
import { PostCard } from "../components/PostCard"

export async function getStaticProps() {
	const [posts, users] = await Promise.all([getPosts(), getUsers()])
	return {
		props: { posts, users },
	}
}

export default function HomePage({ posts, users }) {
	const userById = new Map(users.map(user => [user.id, user]))

	return (
		<>
			<Head>
				<title>SSR-блог | Все посты</title>
				<meta
					name="description"
					content="Список постов блога. Страница сгенерирована на сервере при сборке с помощью getStaticProps."
				/>
			</Head>
			<h1 className="app-title">Все посты</h1>
			<p className="app-lead">
				Посты загружаются с публичного API JSONPlaceholder во время сборки
				страницы — она приходит в браузер уже готовой.
			</p>
			<span className="app-note">getStaticProps · SSG при сборке</span>
			<div className="posts-list">
				{posts.map(post => (
					<PostCard key={post.id} post={post} user={userById.get(post.userId)} />
				))}
			</div>
		</>
	)
}
