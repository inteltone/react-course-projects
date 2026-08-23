import { ThemeProvider } from "./context/ThemeProvider"
import { useTheme } from "./context/ThemeContext"
import { PortalProvider } from "./portal/PortalProvider"
import { useModal } from "./hooks/useModal"
import { GlobalModal } from "./components/GlobalModal"
import { ContextualTooltip } from "./components/ContextualTooltip"

function DemoContent() {
	const { theme, toggleTheme } = useTheme()
	const modal = useModal()

	return (
		<div className={`app-page app-page_${theme}`}>
			<div className="app-page__header">
				<p className="app-page__title">Порталы в React</p>
				<p className="app-page__subtitle">
					GlobalModal и ContextualTooltip рендерятся в собственных
					DOM-контейнерах через createPortal
				</p>
			</div>

			<div className="app-page__body">
				<div className="app-page__section">
					<p className="app-page__section-title">1. GlobalModal</p>
					<p className="app-page__text">
						Окно открывается через хук useModal, рендерится в #modal-root,
						закрывается по Escape и клику на оверлей, блокирует скролл.
					</p>
					<button
						className="app-controls__button"
						type="button"
						onClick={modal.open}
					>
						Открыть модальное окно
					</button>
					<GlobalModal
						open={modal.isOpen}
						title="Модальное окно через портал"
						onClose={modal.close}
					>
						<p className="app-modal__text">
							Я рендерюсь в #modal-root, хотя по React-дереву нахожусь
							внутри этой секции. Мой DOM-узел не зависит от стилей
							и границ родителя.
						</p>
						<button
							className="app-controls__button"
							type="button"
							onClick={modal.close}
						>
							Закрыть
						</button>
					</GlobalModal>
				</div>

				<div className="app-page__section">
					<p className="app-page__section-title">2. ContextualTooltip</p>
					<p className="app-page__text">
						Тултип появляется при наведении, рендерится в #tooltip-root и
						стилизуется через контекст темы. Родитель обрезан через
						overflow: hidden, но тултип-портал вырывается за его границы.
					</p>
					<button
						className="app-controls__button"
						type="button"
						onClick={toggleTheme}
					>
						Тема: {theme === "light" ? "светлая" : "тёмная"} — переключить
					</button>
					<div className="app-page__clip">
						<ContextualTooltip text="Я рендерюсь в #tooltip-root и не обрезаюсь родителем">
							<button className="app-controls__button" type="button">
								Наведи курсор на меня
							</button>
						</ContextualTooltip>
					</div>
				</div>
			</div>
		</div>
	)
}

export function App() {
	return (
		<PortalProvider>
			<ThemeProvider>
				<DemoContent />
			</ThemeProvider>
		</PortalProvider>
	)
}
