import { useCallback, useState } from "react"

// AsyncSafe — хук для асинхронных операций.
// Принимает async-функцию и возвращает { execute, loading, error, reset }.
// execute запускает операцию и кладёт ошибку в state вместо того,
// чтобы ронять приложение (Error Boundary асинхронные ошибки не ловит).
export function useAsyncSafe(asyncFn) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const execute = useCallback(
		async (...args) => {
			setLoading(true)
			setError(null)
			try {
				const result = await asyncFn(...args)
				return result
			} catch (err) {
				setError(err)
				return undefined
			} finally {
				setLoading(false)
			}
		},
		[asyncFn]
	)

	const reset = useCallback(() => {
		setError(null)
		setLoading(false)
	}, [])

	return { execute, loading, error, reset }
}
