import Head from "next/head"

export default function AboutPage() {
	return (
		<>
			<Head>
				<title>О нас | SSR-блог</title>
				<meta
					name="description"
					content="О проекте SSR-блог: учебный пример серверного рендеринга на Next.js."
				/>
				<meta property="og:title" content="О нас | SSR-блог" />
				<meta
					property="og:description"
					content="Учебный пример серверного рендеринга на Next.js."
				/>
			</Head>
			<div className="about-page">
				<h1 className="about-page__title">О нас</h1>
				<p className="about-page__text">
					Это учебный проект курса React, посвящённый серверному рендерингу
					(Server Side Rendering). В отличие от SPA, где страницу собирает
					браузер, Next.js отдаёт готовый HTML с сервера — контент виден сразу,
					даже при отключённом JavaScript.
				</p>
				<p className="about-page__text">В проекте на практике разобрано:</p>
				<ul className="about-page__list">
					<li>файловая маршрутизация через папку pages/;</li>
					<li>статическая генерация (SSG): getStaticProps и getStaticPaths;</li>
					<li>динамические маршруты вида /posts/[id];</li>
					<li>навигация без перезагрузки через next/link;</li>
					<li>оптимизация изображений через next/image;</li>
					<li>SEO-теги через next/head;</li>
					<li>API-роуты (pages/api) внутри приложения.</li>
				</ul>
			</div>
		</>
	)
}
