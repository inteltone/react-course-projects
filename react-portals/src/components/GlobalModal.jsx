import { useEffect } from "react"
import { createPortal } from "react-dom"
import { usePortal } from "../portal/PortalContext"

// GlobalModal рендерится в #modal-root, хотя по React-дереву
// остаётся в месте вызова: контекст, события и хуки работают как обычно.
export function GlobalModal({ open, title, children, onClose }) {
	const { modalRoot } = usePortal()

	useEffect(() => {
		if (!open) {
			return undefined
		}

		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				onClose()
			}
		}

		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = "hidden"
		document.addEventListener("keydown", handleKeyDown)

		return () => {
			document.body.style.overflow = previousOverflow
			document.removeEventListener("keydown", handleKeyDown)
		}
	}, [open, onClose])

	if (!open || !modalRoot) {
		return null
	}

	return createPortal(
		<div
			className="app-modal"
			role="dialog"
			aria-modal="true"
			aria-label={title}
			onClick={onClose}
		>
			<div
				className="app-modal__content"
				role="document"
				onClick={(event) => event.stopPropagation()}
			>
				<p className="app-modal__title">{title}</p>
				<div className="app-modal__body">{children}</div>
			</div>
		</div>,
		modalRoot
	)
}
