import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './app.scss'
import { ALL_DEPARTMENTS, initialEmployees } from './data/employees'
import FormAdd from './components/form-add/FormAdd'
import SelectDepartment from './components/select-department/SelectDepartment'
import EmployeeList from './components/employee-list/EmployeeList'

function App() {
	// Единственный источник истины: сами сотрудники и настройки отображения.
	const [employees, setEmployees] = useState(initialEmployees)
	const [filteredDepartment, setFilteredDepartment] = useState(ALL_DEPARTMENTS)
	const [sortOrder, setSortOrder] = useState(null) // null | 'asc' | 'desc'

	// Производные данные — вычисляются при рендере, а не хранятся в состоянии.
	const filtered =
		filteredDepartment === ALL_DEPARTMENTS
			? employees
			: employees.filter(employee => employee.department === filteredDepartment)

	const visibleEmployees =
		sortOrder === null
			? filtered
			: [...filtered].sort((a, b) =>
					sortOrder === 'asc'
						? a.name.localeCompare(b.name)
						: b.name.localeCompare(a.name)
				)

	function addEmployee(employee) {
		setEmployees(prev => [{ id: uuidv4(), ...employee }, ...prev])
		// Сбрасываем фильтр, иначе новый сотрудник может не попасть в выборку.
		setFilteredDepartment(ALL_DEPARTMENTS)
	}

	function removeEmployee(id) {
		setEmployees(prev => prev.filter(employee => employee.id !== id))
	}

	// Клики по заголовку: исходный порядок → А→Я → Я→А → исходный порядок.
	function toggleSort() {
		setSortOrder(prev => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null))
	}

	return (
		<>
			<FormAdd onAddEmployee={addEmployee} />
			<SelectDepartment
				value={filteredDepartment}
				onChange={setFilteredDepartment}
			/>
			<EmployeeList
				employees={visibleEmployees}
				emptyMessage={
					employees.length === 0
						? 'В списке нет сотрудников.'
						: 'В выбранном отделе нет сотрудников.'
				}
				sortOrder={sortOrder}
				onToggleSort={toggleSort}
				onRemoveEmployee={removeEmployee}
			/>
		</>
	)
}

export default App
