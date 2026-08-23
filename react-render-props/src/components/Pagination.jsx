import { useState } from "react"

export function Pagination({ totalItems, pageSize, children }) {
	const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
	const [currentPage, setCurrentPage] = useState(1)

	const goToPage = (page) => {
		setCurrentPage(Math.min(Math.max(1, page), totalPages))
	}

	const nextPage = () => goToPage(currentPage + 1)
	const prevPage = () => goToPage(currentPage - 1)

	return children({
		currentPage,
		totalPages,
		goToPage,
		nextPage,
		prevPage,
	})
}
