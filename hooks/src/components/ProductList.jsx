import { memo } from "react"
import { Product } from "./Product"

export const ProductList = memo(function ProductList({ products, onAdd }) {
	if (products.length === 0) {
		return (
			<div className="products">
				<p className="section-title">Товары</p>
				<p className="products__empty">Ничего не найдено</p>
			</div>
		)
	}

	return (
		<div className="products">
			<p className="section-title">Товары</p>
			<div className="products__grid">
				{products.map((product) => (
					<Product key={product.id} product={product} onAdd={onAdd} />
				))}
			</div>
		</div>
	)
})
