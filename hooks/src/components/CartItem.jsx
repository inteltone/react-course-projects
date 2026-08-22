import { memo } from "react"

export const CartItem = memo(function CartItem({ item, onRemove, onChangeQuantity }) {
	const { product } = item

	return (
		<div className="cart-item">
			<span className="cart-item__name">{product.name}</span>
			<div className="cart-item__controls">
				<button className="button button--small" onClick={() => onChangeQuantity(item.id, -1)}>
					-
				</button>
				<span className="cart-item__quantity">{item.quantity}</span>
				<button className="button button--small" onClick={() => onChangeQuantity(item.id, 1)}>
					+
				</button>
			</div>
			<span className="cart-item__price">
				{(product.price * item.quantity).toLocaleString("ru-RU")} ₽
			</span>
			<button className="button button--link" onClick={() => onRemove(item.id)}>
				Удалить
			</button>
		</div>
	)
})
