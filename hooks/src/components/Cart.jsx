import { memo } from "react"
import { CartItem } from "./CartItem"

export const Cart = memo(function Cart({ items, total, onRemove, onChangeQuantity, onClear }) {
	if (items.length === 0) {
		return (
			<div className="cart">
				<p className="section-title">Корзина</p>
				<p className="cart__empty">Корзина пуста</p>
			</div>
		)
	}

	return (
		<div className="cart">
			<p className="section-title">Корзина</p>
			<div className="cart__items">
				{items.map((item) => (
					<CartItem
						key={item.id}
						item={item}
						onRemove={onRemove}
						onChangeQuantity={onChangeQuantity}
					/>
				))}
			</div>
			<div className="cart__footer">
				<p className="cart__total">Итого: {total.toLocaleString("ru-RU")} ₽</p>
				<button className="button button--ghost" onClick={onClear}>
					Очистить корзину
				</button>
			</div>
		</div>
	)
})
