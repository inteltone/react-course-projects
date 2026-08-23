import { useEffect, useState } from "react"
import { getDisplayName } from "./getDisplayName"

// HOC для загрузки. Если передан проп isLoading — используем его,
// иначе показываем индикатор по внутреннему таймеру.
export function withLoading(WrappedComponent, { delay = 1200 } = {}) {
	function WithLoading(props) {
		const { isLoading } = props
		const [internalLoading, setInternalLoading] = useState(true)

		useEffect(() => {
			if (isLoading !== undefined) {
				return undefined
			}

			const timer = setTimeout(() => setInternalLoading(false), delay)
			return () => clearTimeout(timer)
		}, [isLoading])

		const loading = isLoading !== undefined ? isLoading : internalLoading

		if (loading) {
			return (
				<div className="app-loading" role="status">
					<p className="app-loading__text">Загрузка...</p>
				</div>
			)
		}

		return <WrappedComponent {...props} />
	}

	WithLoading.displayName = `WithLoading(${getDisplayName(WrappedComponent)})`

	return WithLoading
}
