import Image from "next/image"
import Link from "next/link"

export function PostCard({ post, user }) {
	return (
		<article className="post-card">
			<div className="post-card__author">
				<Image
					className="post-card__avatar"
					src={`https://i.pravatar.cc/64?img=${user.id}`}
					alt={`Аватар пользователя ${user.name}`}
					width={64}
					height={64}
				/>
				<div className="post-card__author-info">
					<p className="post-card__author-name">{user.name}</p>
					<p className="post-card__author-email">{user.email}</p>
				</div>
			</div>
			<h2 className="post-card__title">
				<Link href={`/posts/${post.id}`}>{post.title}</Link>
			</h2>
			<p className="post-card__text">{post.body}</p>
			<Link href={`/posts/${post.id}`} className="post-card__link">
				Читать далее →
			</Link>
		</article>
	)
}
