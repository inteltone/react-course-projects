import { SafeComponent } from "./SafeComponent"

// EventBug — компонент, который намеренно падает в обработчике события.
// Error Boundary такие ошибки не ловит, поэтому кнопка обёрнута
// в SafeComponent с try/catch.
export function EventBug() {
	const handleClick = () => {
		throw new Error("Ошибка в обработчике события (onClick)")
	}

	return (
		<SafeComponent onClick={handleClick}>
			Нажми, чтобы сломать обработчик события
		</SafeComponent>
	)
}
