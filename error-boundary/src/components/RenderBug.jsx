import { useState } from "react"

// RenderBug — компонент, который намеренно падает во время рендера.
// После сброса Error Boundary компонент монтируется заново,
// и цикл «сломать → починить» можно повторять.
export function RenderBug() {
	const [count, setCount] = useState(0)

	if (count > 0) {
		throw new Error(
			"Ошибка во время рендера: RenderBug сломался на рендере №" + (count + 1)
		)
	}

	return (
		<div className="app-bug">
			<p className="app-bug__text">
				Компонент отрендерился успешно (попытка №{count + 1}).
			</p>
			<button
				className="app-bug__button"
				type="button"
				onClick={() => setCount((value) => value + 1)}
			>
				Сломать рендер
			</button>
		</div>
	)
}
