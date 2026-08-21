export default function Settings({user, onToggleField}) {	

	return (
		<div className="settings">
			<label>
				Роль:
				<input type="checkbox" onChange={() => onToggleField('isAdmin')} checked={user.isAdmin} />
			</label>
			<label>
				Статус:
				<input type="checkbox" onChange={() => onToggleField('isActive')} checked={user.isActive} />
			</label>
		</div>
	)
}