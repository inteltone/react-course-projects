import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider"
import { Layout } from "./components/Layout"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Loading } from "./components/Loading"
import { ErrorPage } from "./components/ErrorPage"
import { userLoader } from "./loaders/userLoader"

const HomePage = lazy(() =>
	import("./pages/HomePage").then((module) => ({ default: module.HomePage }))
)
const AboutPage = lazy(() =>
	import("./pages/AboutPage").then((module) => ({ default: module.AboutPage }))
)
const UserPage = lazy(() =>
	import("./pages/UserPage").then((module) => ({ default: module.UserPage }))
)
const SearchPage = lazy(() =>
	import("./pages/SearchPage").then((module) => ({ default: module.SearchPage }))
)
const AdminPage = lazy(() =>
	import("./pages/AdminPage").then((module) => ({ default: module.AdminPage }))
)
const LoginPage = lazy(() =>
	import("./pages/LoginPage").then((module) => ({ default: module.LoginPage }))
)
const NotFoundPage = lazy(() =>
	import("./pages/NotFoundPage").then((module) => ({
		default: module.NotFoundPage,
	}))
)

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Layout />,
			children: [
				{ index: true, element: <HomePage /> },
				{ path: "about", element: <AboutPage /> },
				{
					path: "users/:userId",
					element: <UserPage />,
					loader: userLoader,
					errorElement: <ErrorPage />,
				},
				{ path: "search", element: <SearchPage /> },
				{
					element: <ProtectedRoute />,
					children: [{ path: "admin", element: <AdminPage /> }],
				},
				{ path: "login", element: <LoginPage /> },
				{ path: "*", element: <NotFoundPage /> },
			],
		},
	],
	{
		future: {
			v7_startTransition: true,
		},
	}
)

export function App() {
	return (
		<AuthProvider>
			<Suspense fallback={<Loading />}>
				<RouterProvider router={router} />
			</Suspense>
		</AuthProvider>
	)
}
