import { useState } from "react"
import { useAsyncSafe } from "../hooks/useAsyncSafe"

// Асинхронные операции-заглушки: одна успешная, другая падает.
// Error Boundary асинхронные ошибки не ловит, поэтому используется
// хук useAsyncSafe, который прячет ошибку в state.
function successAsyncTask() {
	return new Promise((resolve) => {
		setTimeout(() => resolve("Данные успешно загружены"), 800)
	})
}

function failAsyncTask() {
	return new Promise((resolve, reject) => {
		setTimeout(() => reject(new Error("Ошибка асинхронной операции")), 800)
	})
}

export function AsyncDemo() {
	const [result, setResult] = useState(null)
	const success = useAsyncSafe(successAsyncTask)
	const failure = useAsyncSafe(failAsyncTask)

	const handleSuccess = () => {
		success.execute().then(setResult)
	}

	return (
		<div className="app-async">
			<div className="app-async__row">
				<p className="app-async__label">Успешный запрос</p>
				<button
					className="app-async__button"
					type="button"
					onClick={handleSuccess}
				>
					Выполнить
				</button>
				{success.loading && <p className="app-async__status">Загрузка...</p>}
				{result && !success.loading && (
					<p className="app-async__success">{result}</p>
				)}
			</div>

			<div className="app-async__row">
				<p className="app-async__label">Падающий запрос</p>
				<div className="app-async__controls">
					<button
						className="app-async__button"
						type="button"
						onClick={() => failure.execute()}
					>
						Выполнить
					</button>
					<button
						className="app-async__button"
						type="button"
						onClick={failure.reset}
					>
						Сбросить
					</button>
				</div>
				{failure.loading && <p className="app-async__status">Загрузка...</p>}
				{failure.error && (
					<p className="app-async__error">Ошибка: {failure.error.message}</p>
				)}
			</div>
		</div>
	)
}
