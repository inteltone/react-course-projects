import { getDisplayName } from "./getDisplayName"

// Фабрика HOC для проверки прав. requiredPermissions — список разрешений,
// которые должны быть у пользователя до рендера компонента.
export function withPermission(requiredPermissions) {
	return function withPermissionHOC(WrappedComponent) {
		function WithPermission(props) {
			const { permissions = [] } = props
			const isAllowed = requiredPermissions.every((permission) =>
				permissions.includes(permission)
			)

			if (!isAllowed) {
				return (
					<div className="app-access">
						<p className="app-access__title">Нет доступа</p>
						<p className="app-access__text">
							Требуется разрешение: «{requiredPermissions.join(", ")}»
						</p>
						<p className="app-access__hint">
							Ваши разрешения: {permissions.length ? permissions.join(", ") : "—"}
						</p>
					</div>
				)
			}

			return <WrappedComponent {...props} />
		}

		WithPermission.displayName = `WithPermission(${getDisplayName(WrappedComponent)})`

		return WithPermission
	}
}
