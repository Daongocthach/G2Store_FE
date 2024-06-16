const initialState = {
    cartItems: []
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        }
        case 'REMOVE_CART': {
            const productId = action.payload
            const updatedList = state.cartItems.filter(
                (cartItem) => cartItem !== productId
            )
            return {
                ...state,
                cartItems: updatedList
            }
        }
        case 'DELETE_ALL_CART': {
            return {
                cartItems: []
            }
        }
        case 'SET_CART': {
            const productIds = action.payload.flatMap(item =>
                item.shop_items.map(shopItem => shopItem.product_id)
            )
            return {
                ...state,
                cartItems: productIds
            }
        }
        default:
            return state
    }
}

export default cartReducer
