export function Pagination({ page, pages, onChange }) {
	if (pages <= 1) return null

	return (
		<div className="app-pagination">
			{Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
				<button
					key={number}
					type="button"
					className={
						"app-pagination__button" +
						(number === page ? " app-pagination__button_active" : "")
					}
					onClick={() => onChange(number)}
				>
					{number}
				</button>
			))}
		</div>
	)
}