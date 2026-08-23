import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import { UserProvider } from './contexts/UserContext'
import { Header } from './components/Header'
import { RequireAuth } from './components/RequireAuth'
import { Profile } from './components/Profile'

function AppContent() {
	const { theme } = useTheme()
	const { t } = useLanguage()

	return (
		<div className={`app app--${theme}`}>
			<Header />

			<main className="app__main">
				<section className="app-card">
					<p className="app-card__title">{t.cardTitle}</p>
					<RequireAuth>
						<Profile />
					</RequireAuth>
				</section>
			</main>
		</div>
	)
}

export function App() {
	return (
		<ThemeProvider>
			<LanguageProvider>
				<UserProvider>
					<AppContent />
				</UserProvider>
			</LanguageProvider>
		</ThemeProvider>
	)
}
