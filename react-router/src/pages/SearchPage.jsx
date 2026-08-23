import { Link, useLocation } from "react-router-dom"

export function SearchPage() {
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)

	const query = searchParams.get("q")
	const page = searchParams.get("page") || "1"

	return (
		<div className="app-page-card">
			<h1 className="app-page-card__title">Поиск</h1>

			{query ? (
				<>
					<p className="app-page-card__text">
						Поисковый запрос из URL (useLocation):{" "}
						<strong>{query}</strong>
					</p>
					<p className="app-page-card__text">
						Страница результатов: {page}
					</p>
				</>
			) : (
				<p className="app-page-card__text">
					Query-параметр q не задан. Передайте запрос в адресной строке:
					/search?q=react&page=2
				</p>
			)}

			<p className="app-page-card__hint">
				Примеры:{" "}
				<Link to="/search?q=react">react</Link>,{" "}
				<Link to="/search?q=роутер&page=2">роутер, стр. 2</Link>,{" "}
				<Link to="/search?q=useLocation&page=7">useLocation, стр. 7</Link>
			</p>
		</div>
	)
}
