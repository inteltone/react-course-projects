import { MusicPlayer } from "./components/MusicPlayer"
import { AutoFocusForm } from "./components/AutoFocusForm"

export function App() {
	return (
		<div className="app-page">
			<header className="app-page__header">
				<p className="app-page__title">Refs в React</p>
				<p className="app-page__subtitle">Прямой доступ к DOM и данные без перерендера</p>
			</header>

			<div className="app-page__main">
				<div className="app-page__section">
					<p className="app-page__section-title">Музыкальный плеер</p>
					<MusicPlayer />
				</div>

				<div className="app-page__section">
					<p className="app-page__section-title">Форма с автофокусом</p>
					<AutoFocusForm />
				</div>
			</div>
		</div>
	)
}
