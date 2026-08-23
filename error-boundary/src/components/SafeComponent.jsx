import { useState } from "react"

// SafeComponent — обёртка для обработки ошибок в событиях.
// Error Boundary не ловит ошибки в обработчиках (onClick, onChange),
// поэтому колбэк оборачивается в try/catch вручную.
export function SafeComponent({ onClick, children, fallback }) {
	const [error, setError] = useState(null)

	const handleClick = () => {
		try {
			onClick()
			setError(null)
		} catch (err) {
			setError(err)
			console.error("Ошибка в обработчике события:", err)
		}
	}

	if (error) {
		if (typeof fallback === "function") {
			return fallback({ error, reset: () => setError(null) })
		}

		return (
			<div className="app-safe">
				<p className="app-safe__error">Ошибка: {error.message}</p>
				<button
					className="app-safe__button"
					type="button"
					onClick={() => setError(null)}
				>
					Повторить
				</button>
			</div>
		)
	}

	return (
		<button className="app-safe__trigger" type="button" onClick={handleClick}>
			{children}
		</button>
	)
}
