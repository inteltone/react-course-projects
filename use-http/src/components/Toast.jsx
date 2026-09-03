import { useEffect, useState } from "react"

let nextToastId = 0

export function Toast() {
	const [toasts, setToasts] = useState([])

	useEffect(() => {
		const onError = (event) => {
			nextToastId += 1
			const toast = { id: nextToastId, message: event.detail.message }
			setToasts((prev) => [...prev, toast])

			setTimeout(() => {
				setToasts((prev) => prev.filter((item) => item.id !== toast.id))
			}, 4000)
		}

		window.addEventListener("api-error", onError)
		return () => window.removeEventListener("api-error", onError)
	}, [])

	if (toasts.length === 0) return null

	return (
		<div className="app-toasts">
			{toasts.map((toast) => (
				<div key={toast.id} className="app-toasts__item">
					{toast.message}
				</div>
			))}
		</div>
	)
}