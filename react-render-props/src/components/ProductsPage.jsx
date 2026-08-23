import { useMemo, useState } from "react"
import { List } from "./List"
import { Pagination } from "./Pagination"
import { Form } from "./Form"

const PAGE_SIZE = 5

const PRODUCTS = [
	{ id: 1, name: "Кофе в зёрнах Арабика", price: 899, category: "Напитки" },
	{ id: 2, name: "Чай зелёный листовой", price: 450, category: "Напитки" },
	{ id: 3, name: "Кружка керамическая", price: 650, category: "Посуда" },
	{ id: 4, name: "Термос 0,5 л", price: 1200, category: "Посуда" },
	{ id: 5, name: "Кофемашина капсульная", price: 7990, category: "Техника" },
	{ id: 6, name: "Кофемолка ручная", price: 2300, category: "Техника" },
	{ id: 7, name: "Сироп карамельный", price: 390, category: "Напитки" },
	{ id: 8, name: "Кекс шоколадный", price: 210, category: "Десерты" },
	{ id: 9, name: "Печенье овсяное", price: 180, category: "Десерты" },
	{ id: 10, name: "Корзина для хлеба", price: 940, category: "Посуда" },
	{ id: 11, name: "Кофе Колумбия", price: 1050, category: "Напитки" },
	{ id: 12, name: "Вафельница", price: 3400, category: "Техника" },
	{ id: 13, name: "Чизкейк", price: 320, category: "Десерты" },
]

export function ProductsPage() {
	const [search, setSearch] = useState("")

	const filtered = useMemo(() => {
		const query = search.trim().toLowerCase()
		if (!query) return PRODUCTS
		return PRODUCTS.filter((product) =>
			product.name.toLowerCase().includes(query)
		)
	}, [search])

	return (
		<div className="app-catalog">
			<Form
				initialValues={{ search: "" }}
				validate={(values) => {
					const errors = {}
					const length = values.search.trim().length
					if (length > 0 && length < 2) {
						errors.search = "Минимум 2 символа"
					}
					return errors
				}}
				onSubmit={(values) => setSearch(values.search)}
			>
				{({ values, handleChange, handleSubmit, errors }) => (
					<form className="app-search" onSubmit={handleSubmit} noValidate>
						<div className="app-search__field">
							<label className="app-search__label" htmlFor="search">
								Поиск товаров
							</label>
							<input
								id="search"
								className="app-search__input"
								type="text"
								name="search"
								value={values.search}
								onChange={handleChange}
								placeholder="Например: кофе"
							/>
							{errors.search && (
								<p className="app-search__error">{errors.search}</p>
							)}
						</div>
						<button className="app-search__button" type="submit">
							Найти
						</button>
					</form>
				)}
			</Form>

			<p className="app-catalog__count">Найдено товаров: {filtered.length}</p>

			<Pagination key={search} totalItems={filtered.length} pageSize={PAGE_SIZE}>
				{({ currentPage, totalPages, goToPage, nextPage, prevPage }) => {
					const start = (currentPage - 1) * PAGE_SIZE
					const pageItems = filtered.slice(start, start + PAGE_SIZE)

					return (
						<div className="app-catalog__body">
							{pageItems.length === 0 ? (
								<p className="app-catalog__empty">
									По запросу ничего не найдено
								</p>
							) : (
								<List
									items={pageItems}
									withSeparator
									renderItem={(product) => (
										<div className="app-product">
											<p className="app-product__name">{product.name}</p>
											<p className="app-product__category">
												{product.category}
											</p>
											<p className="app-product__price">
												{product.price} ₽
											</p>
										</div>
									)}
								/>
							)}

							<div className="app-pagination">
								<p className="app-pagination__info">
									Страница {currentPage} из {totalPages}
								</p>
								<div className="app-pagination__controls">
									<button
										className="app-pagination__button"
										type="button"
										onClick={prevPage}
										disabled={currentPage === 1}
									>
										← Назад
									</button>
									{Array.from(
										{ length: totalPages },
										(_, index) => index + 1
									).map((page) => (
										<button
											key={page}
											className={`app-pagination__button ${
												page === currentPage
													? "app-pagination__button_active"
													: ""
											}`}
											type="button"
											onClick={() => goToPage(page)}
										>
											{page}
										</button>
									))}
									<button
										className="app-pagination__button"
										type="button"
										onClick={nextPage}
										disabled={currentPage === totalPages}
									>
										Вперёд →
									</button>
								</div>
							</div>
						</div>
					)
				}}
			</Pagination>
		</div>
	)
}
