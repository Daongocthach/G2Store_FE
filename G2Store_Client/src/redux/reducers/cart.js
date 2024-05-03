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
        case 'UPDATE_QUANTITY': {
            const updatedCartItem = action.payload
            const productId = updatedCartItem.id.productId
            const updatedList = state.cartItems.map((cartItem) =>
                productId === cartItem.id.productId ? updatedCartItem : cartItem
            )
            return {
                ...state,
                cartItems: updatedList
            }
        }
        case 'REMOVE_CART': {
            const productId = action.payload
            const updatedList = state.cartItems.filter(
                (cartItem) => cartItem?.product_id !== productId
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
            const cartItems = action.payload.flatMap(item => item.items)
            console.log(cartItems)
            return {
                ...state,
                cartItems: cartItems
            }
        }
        default:
            return state
    }
}

export default cartReducer
