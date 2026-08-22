import { useState } from "react"
import { Display } from "./Display"

export function Counter() {
	const [count, setCount] = useState(0)

	function increment() {
		setCount((prev) => prev + 1)
	}

	function decrement() {
		setCount((prev) => (prev > 0 ? prev - 1 : prev))
	}

	function reset() {
		setCount(0)
	}

	return (
		<div className="demo">
			<Display count={count} />
			<div className="counter-buttons">
				<button className="counter-button" onClick={decrement}>
					-1
				</button>
				<button className="counter-button" onClick={reset}>
					Сбросить
				</button>
				<button className="counter-button" onClick={increment}>
					+1
				</button>
			</div>
		</div>
	)
}
