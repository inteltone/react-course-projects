import { withData } from "../hoc/withData"
import { withLoading } from "../hoc/withLoading"
import { fetchUsers } from "../mock/api"

function UserListContent({ data, title }) {
	if (!data) {
		return null
	}

	return (
		<div className="app-users">
			<p className="app-users__title">{title}</p>
			<p className="app-users__count">Найдено: {data.length}</p>
			<ul className="app-users__list">
				{data.map((user) => (
					<li className="app-users__item" key={user.id}>
						<p className="app-users__name">{user.name}</p>
						<p className="app-users__email">{user.email}</p>
						<p className="app-users__role">{user.role}</p>
					</li>
				))}
			</ul>
		</div>
	)
}

// withData загружает данные и передаёт isLoading в withLoading,
// который показывает индикатор загрузки
export const UserList = withData(withLoading(UserListContent), fetchUsers)
