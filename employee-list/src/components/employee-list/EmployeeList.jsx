import './employee-list.scss'
import EmployeeItem from '../employee-item/EmployeeItem'

export default function EmployeeList({
	employees,
	emptyMessage,
	sortOrder,
	onToggleSort,
	onRemoveEmployee,
}) {
	if (employees.length === 0) {
		return <p className="app-list-empty">{emptyMessage}</p>
	}

	return (
		<div className="app-list-holder">
			<div className="app-list-table">
				<div className="table-head">
					<span>
						Имя
						<button
							type="button"
							className={`sort-btn sort-btn--${sortOrder ?? 'none'}`}
							onClick={onToggleSort}
							aria-label="Сортировать по имени"
						>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
						</button>
					</span>
					<span>Подразделение</span>
					<span>Должность</span>
				</div>
				<ul className="app-list">
					{employees.map(employee => (
						<EmployeeItem
							key={employee.id}
							id={employee.id}
							name={employee.name}
							department={employee.department}
							position={employee.position}
							onRemoveEmployee={onRemoveEmployee}
						/>
					))}
				</ul>
			</div>
		</div>
	)
}
