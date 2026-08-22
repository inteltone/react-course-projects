import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react"
import { ThemeContext } from "./context/ThemeContext"
import { cartReducer } from "./reducer/cartReducer"
import { products } from "./data/products"
import { ThemeToggle } from "./components/ThemeToggle"
import { ProductList } from "./components/ProductList"
import { Cart } from "./components/Cart"

function loadCart() {
	try {
		const saved = localStorage.getItem("cart")
		const parsed = saved ? JSON.parse(saved) : null
		return parsed && Array.isArray(parsed.items) ? parsed : { items: [] }
	} catch {
		return { items: [] }
	}
}

export function App() {
	const [theme, setTheme] = useState("light")
	const [query, setQuery] = useState("")
	const [cart, dispatch] = useReducer(cartReducer, undefined, loadCart)
	const searchRef = useRef(null)

	useEffect(() => {
		searchRef.current.focus()
	}, [])

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart))
	}, [cart])

	const toggleTheme = useCallback(() => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"))
	}, [])

	const addToCart = useCallback((productId) => {
		dispatch({ type: "add", payload: productId })
	}, [])

	const removeFromCart = useCallback((productId) => {
		dispatch({ type: "remove", payload: productId })
	}, [])

	const changeQuantity = useCallback((productId, delta) => {
		dispatch({ type: "changeQuantity", payload: { id: productId, delta } })
	}, [])

	const clearCart = useCallback(() => {
		dispatch({ type: "clear" })
	}, [])

	const filteredProducts = useMemo(
		() => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
		[query],
	)

	const cartItems = useMemo(
		() =>
			cart.items
				.map((item) => {
					const product = products.find((p) => p.id === item.id)
					return product ? { ...item, product } : null
				})
				.filter(Boolean),
		[cart.items],
	)

	const total = useMemo(
		() => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
		[cartItems],
	)

	const itemCount = useMemo(
		() => cartItems.reduce((sum, item) => sum + item.quantity, 0),
		[cartItems],
	)

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<div className={`app ${theme}`}>
				<header className="app__header">
					<p className="app__title">Корзина покупок</p>
					<div className="app__header-actions">
						<span className="app__cart-count">Товаров в корзине: {itemCount}</span>
						<ThemeToggle />
					</div>
				</header>

				<div className="app__search">
					<input
						ref={searchRef}
						className="app__search-input"
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Поиск товаров..."
					/>
				</div>

				<div className="app__main">
					<ProductList products={filteredProducts} onAdd={addToCart} />
					<Cart
						items={cartItems}
						total={total}
						onRemove={removeFromCart}
						onChangeQuantity={changeQuantity}
						onClear={clearCart}
					/>
				</div>
			</div>
		</ThemeContext.Provider>
	)
}
