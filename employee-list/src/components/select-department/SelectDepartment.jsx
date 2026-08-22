import './select-department.scss'
import { ALL_DEPARTMENTS, DEPARTMENTS } from '../../data/employees'

const filterOptions = [ALL_DEPARTMENTS, ...DEPARTMENTS]

export default function SelectDepartment({ value, onChange }) {
	return (
		<div className="app-select-wrap">
			<label htmlFor="department-filter">Фильтр: </label>
			<select
				id="department-filter"
				className="app-select"
				value={value}
				onChange={e => onChange(e.target.value)}
			>
				{filterOptions.map(item => (
					<option value={item} key={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	)
}
