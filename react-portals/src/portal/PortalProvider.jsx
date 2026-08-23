import { useEffect, useState } from "react"
import { PortalContext } from "./PortalContext"

const CONTAINERS = {
	portalRoot: "portal-root",
	modalRoot: "modal-root",
	tooltipRoot: "tooltip-root",
}

// PortalProvider создаёт DOM-контейнеры для порталов при монтировании
// и отдаёт их через контекст. При размонтировании контейнеры удаляются.
export function PortalProvider({ children }) {
	const [containers, setContainers] = useState(null)

	useEffect(() => {
		const created = {}

		Object.entries(CONTAINERS).forEach(([key, id]) => {
			const node = document.createElement("div")
			node.id = id
			document.body.appendChild(node)
			created[key] = node
		})

		setContainers(created)

		return () => {
			Object.values(created).forEach((node) => node.remove())
		}
	}, [])

	if (!containers) {
		return null
	}

	return (
		<PortalContext.Provider value={containers}>
			{children}
		</PortalContext.Provider>
	)
}
