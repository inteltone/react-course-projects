import { memo } from "react"

export const Product = memo(function Product({ product, onAdd }) {
	return (
		<article className="product">
			<p className="product__name">{product.name}</p>
			<p className="product__price">{product.price.toLocaleString("ru-RU")} ₽</p>
			<button className="button button--accent" onClick={() => onAdd(product.id)}>
				В корзину
			</button>
		</article>
	)
})
