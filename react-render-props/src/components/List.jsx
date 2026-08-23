import { Fragment } from "react"

export function List({ items, renderItem, withSeparator = false }) {
	return (
		<div className="app-list">
			{items.map((item, index) => (
				<Fragment key={item?.id ?? index}>
					{index > 0 && withSeparator && <div className="app-list__separator" />}
					<div className="app-list__item">{renderItem(item, index)}</div>
				</Fragment>
			))}
		</div>
	)
}
