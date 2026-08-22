export default function EmployeeItem({
	id,
	name,
	department,
	position,
	onRemoveEmployee,
}) {
	return (
		<li className="table-row">
			<span>{name}</span>
			<span>{department}</span>
			<span>{position}</span>
			<button
				type="button"
				className="btn-del"
				onClick={() => onRemoveEmployee(id)}
				aria-label={`Удалить: ${name}`}
			>
				<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/>
					<path d="m6 6 12 12"/>
				</svg>
			</button>
		</li>
	)
}
