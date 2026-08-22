import { Modal } from "./Modal"

export function ConfirmationModal({ message, onConfirm, onClose }) {
	return (
		<Modal
			title="Подтверждение"
			onClose={onClose}
			actions={
				<>
					<button className="button button-outline" onClick={onClose}>
						Отмена
					</button>
					<button className="button button-danger" onClick={onConfirm}>
						Подтвердить
					</button>
				</>
			}
		>
			<p className="modal-message">{message}</p>
		</Modal>
	)
}
