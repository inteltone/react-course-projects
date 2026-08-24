import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { getPost, getPosts, getUsers } from "../../lib/data"

export async function getStaticPaths() {
	const posts = await getPosts()
	return {
		paths: posts.map(post => ({ params: { id: String(post.id) } })),
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const [post, users] = await Promise.all([getPost(params.id), getUsers()])
	const user = users.find(current => current.id === post.userId) ?? null
	return {
		props: { post, user },
	}
}

export default function PostPage({ post, user }) {
	return (
		<>
			<Head>
				<title>{post.title} | SSR-блог</title>
				<meta name="description" content={`Пост «${post.title}» на SSR-блоге.`} />
			</Head>
			<article className="post-page">
				<Link href="/" className="post-page__back">
					← Назад к постам
				</Link>
				<h1 className="post-page__title">{post.title}</h1>
				<p className="post-page__body">{post.body}</p>
				<div className="post-page__author">
					<Image
						className="post-page__avatar"
						src={`https://i.pravatar.cc/64?img=${user.id}`}
						alt={`Аватар пользователя ${user.name}`}
						width={64}
						height={64}
					/>
					<div>
						<p className="post-page__author-name">{user.name}</p>
						<p className="post-page__author-email">{user.email}</p>
					</div>
				</div>
			</article>
		</>
	)
}
