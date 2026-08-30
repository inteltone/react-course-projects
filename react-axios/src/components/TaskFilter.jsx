const FILTERS = [
	{ value: "all", label: "Все" },
	{ value: "active", label: "Активные" },
	{ value: "completed", label: "Выполненные" },
]

export function TaskFilter({ filter, onChange }) {
	return (
		<div className="app-task-filter">
			{FILTERS.map((item) => (
				<button
					key={item.value}
					type="button"
					className={
						"app-task-filter__button" +
						(filter === item.value ? " app-task-filter__button_active" : "")
					}
					onClick={() => onChange(item.value)}
				>
					{item.label}
				</button>
			))}
		</div>
	)
}
