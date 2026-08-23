import { useState } from "react"
import { List } from "./components/List"
import { Pagination } from "./components/Pagination"
import { Form } from "./components/Form"
import { ProductsPage } from "./components/ProductsPage"

const SKILLS = ["React", "Vue", "JavaScript", "TypeScript", "CSS"]

const FEATURES = [
	{
		id: 1,
		title: "Render Props",
		description: "Логика в компоненте, отображение — у вас",
	},
	{
		id: 2,
		title: "children как функция",
		description: "Идиоматичный способ в современном React",
	},
	{
		id: 3,
		title: "Композиция",
		description: "Несколько render-пропсов вместе",
	},
]

function FeedbackDemo() {
	const [result, setResult] = useState("")

	return (
		<Form
			initialValues={{ name: "", email: "" }}
			onSubmit={(values) =>
				setResult(`Отправлено: ${values.name}, ${values.email}`)
			}
		>
			{({ values, handleChange, handleSubmit, errors }) => (
				<form className="app-form" onSubmit={handleSubmit} noValidate>
					<div className="app-form__field">
						<label className="app-form__label" htmlFor="name">
							Имя
						</label>
						<input
							className="app-form__input"
							id="name"
							type="text"
							name="name"
							value={values.name}
							onChange={handleChange}
						/>
						{errors.name && (
							<p className="app-form__error">{errors.name}</p>
						)}
					</div>
					<div className="app-form__field">
						<label className="app-form__label" htmlFor="email">
							Email
						</label>
						<input
							className="app-form__input"
							id="email"
							type="email"
							name="email"
							value={values.email}
							onChange={handleChange}
						/>
						{errors.email && (
							<p className="app-form__error">{errors.email}</p>
						)}
					</div>
					<button className="app-form__button" type="submit">
						Отправить
					</button>
					{result && <p className="app-form__status">{result}</p>}
				</form>
			)}
		</Form>
	)
}

function PaginationDemo() {
	return (
		<Pagination totalItems={40} pageSize={10}>
			{({ currentPage, totalPages, goToPage, nextPage, prevPage }) => (
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
			)}
		</Pagination>
	)
}

export function App() {
	return (
		<div className="app-page">
			<div className="app-page__header">
				<p className="app-page__title">Render Props в React</p>
				<p className="app-page__subtitle">
					Компонент решает, что рендерить
				</p>
			</div>

			<div className="app-page__main">
				<div className="app-page__section">
					<p className="app-page__section-title">List — рендер списка</p>
					<p className="app-page__hint">С разделителями:</p>
					<List
						items={SKILLS}
						withSeparator
						renderItem={(skill) => (
							<p className="app-demo-text">{skill}</p>
						)}
					/>
					<p className="app-page__hint">Без разделителей:</p>
					<List
						items={FEATURES}
						renderItem={(feature) => (
							<div className="app-demo-feature">
								<p className="app-demo-text">{feature.title}</p>
								<p className="app-demo-text app-demo-text_muted">
									{feature.description}
								</p>
							</div>
						)}
					/>
				</div>

				<div className="app-page__section">
					<p className="app-page__section-title">
						Pagination — пагинация
					</p>
					<PaginationDemo />
				</div>

				<div className="app-page__section">
					<p className="app-page__section-title">
						Form — управление формой
					</p>
					<FeedbackDemo />
				</div>

				<div className="app-page__section app-page__section_wide">
					<p className="app-page__section-title">
						Каталог товаров — все три компонента вместе
					</p>
					<ProductsPage />
				</div>
			</div>
		</div>
	)
}
