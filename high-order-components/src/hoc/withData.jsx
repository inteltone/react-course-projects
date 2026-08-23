import { useEffect, useState } from "react"
import { getDisplayName } from "./getDisplayName"

// HOC для загрузки данных: fetcher — функция, возвращающая Promise.
// Загруженные данные передаются в компонент через проп data,
// признак загрузки — через проп isLoading.
export function withData(WrappedComponent, fetcher) {
	function WithData(props) {
		const [data, setData] = useState(null)
		const [loading, setLoading] = useState(true)
		const [error, setError] = useState(null)

		useEffect(() => {
			let isActive = true

			setLoading(true)
			setError(null)

			fetcher()
				.then((result) => {
					if (isActive) setData(result)
				})
				.catch((err) => {
					if (isActive) setError(err.message)
				})
				.finally(() => {
					if (isActive) setLoading(false)
				})

			return () => {
				isActive = false
			}
		}, [])

		if (error) {
			return (
				<div className="app-error">
					<p className="app-error__text">Ошибка: {error}</p>
				</div>
			)
		}

		return <WrappedComponent {...props} data={data} isLoading={loading} />
	}

	WithData.displayName = `WithData(${getDisplayName(WrappedComponent)})`

	return WithData
}
