import { useCallback, useState } from "react"

export function useArray(initialValue = []) {
	const [array, setArray] = useState(initialValue)

	const push = useCallback((item) => setArray((prev) => [...prev, item]), [])
	const remove = useCallback(
		(index) => setArray((prev) => prev.filter((_, i) => i !== index)),
		[],
	)
	const update = useCallback(
		(index, newItem) =>
			setArray((prev) => prev.map((item, i) => (i === index ? newItem : item))),
		[],
	)
	const clear = useCallback(() => setArray([]), [])
	const sort = useCallback(
		(compareFn) => setArray((prev) => [...prev].sort(compareFn)),
		[],
	)

	return { array, setArray, push, remove, update, clear, sort }
}
