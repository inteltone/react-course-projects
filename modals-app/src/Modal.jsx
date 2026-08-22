export function Modal({ title, children, actions, onClose }) {
	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<h2>{title}</h2>
					<button className="modal-close" onClick={onClose} aria-label="Закрыть">
						✕
					</button>
				</div>
				<div className="modal-body">{children}</div>
				{actions && <div className="modal-actions">{actions}</div>}
			</div>
		</div>
	)
}
