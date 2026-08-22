export const cartReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const existing = state.items.find((item) => item.id === action.payload)
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }
      return { ...state, items: [...state.items, { id: action.payload, quantity: 1 }] }
    }
    case "changeQuantity": {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.delta }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }
    }
    case "remove":
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) }
    case "clear":
      return { items: [] }
    default:
      return state
  }
}
