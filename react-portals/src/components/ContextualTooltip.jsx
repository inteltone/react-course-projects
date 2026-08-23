import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { usePortal } from "../portal/PortalContext"
import { useTheme } from "../context/ThemeContext"

// ContextualTooltip рендерится в #tooltip-root и берёт тему из контекста:
// портал сохраняет React-контекст, хотя физически узел в другом месте DOM.
export function ContextualTooltip({ text, children }) {
	const { tooltipRoot } = usePortal()
	const { theme } = useTheme()
	const targetRef = useRef(null)
	const [position, setPosition] = useState(null)

	const showTooltip = () => {
		const rect = targetRef.current.getBoundingClientRect()
		setPosition({
			top: rect.bottom + 8,
			left: rect.left + rect.width / 2,
		})
	}

	const hideTooltip = () => {
		setPosition(null)
	}

	return (
		<span
			ref={targetRef}
			className="app-tooltip-anchor"
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
			onFocus={showTooltip}
			onBlur={hideTooltip}
		>
			{children}
			{position && tooltipRoot
				? createPortal(
						<span
							className={`app-tooltip app-tooltip_${theme}`}
							style={{ top: position.top, left: position.left }}
							role="tooltip"
						>
							{text}
						</span>,
						tooltipRoot
					)
				: null}
		</span>
	)
}
