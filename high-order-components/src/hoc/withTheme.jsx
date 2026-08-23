import { useTheme } from "../context/ThemeContext"
import { getDisplayName } from "./getDisplayName"

// HOC для темы: берёт тему из контекста и передаёт её в компонент
// через проп theme, а также колбэк toggleTheme.
export function withTheme(WrappedComponent) {
	function WithTheme(props) {
		const { theme, toggleTheme } = useTheme()

		return (
			<WrappedComponent {...props} theme={theme} toggleTheme={toggleTheme} />
		)
	}

	WithTheme.displayName = `WithTheme(${getDisplayName(WrappedComponent)})`

	return WithTheme
}
