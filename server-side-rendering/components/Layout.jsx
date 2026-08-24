import Link from "next/link"
import { useRouter } from "next/router"

function navLinkClass(pathname, href) {
	return pathname === href ? "app-nav__link app-nav__link--active" : "app-nav__link"
}

export function Layout({ children }) {
	const router = useRouter()

	return (
		<div className="app">
			<header className="app-header">
				<Link href="/" className="app-header__logo">
					SSR-блог
				</Link>
				<nav className="app-nav">
					<Link href="/" className={navLinkClass(router.pathname, "/")}>
						Главная
					</Link>
					<Link href="/about" className={navLinkClass(router.pathname, "/about")}>
						О нас
					</Link>
				</nav>
			</header>
			<main className="app-main">{children}</main>
			<footer className="app-footer">
				Учебный проект курса React. Рендеринг на сервере — Next.js
			</footer>
		</div>
	)
}
