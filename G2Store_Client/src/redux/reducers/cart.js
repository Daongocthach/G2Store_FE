const initialState = {
    cartItems: [],
    quantity: 0,
    total: 0
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const cartItems = [...state.cartItems, action.payload]
            const total = cartItems.reduce(
                (totalPrice, cartItem) =>
                    totalPrice + cartItem.product.price * cartItem.quantity,
                0
            )
            return {
                ...state,
                cartItems: cartItems,
                quantity: state.quantity + 1,
                total: total
            }
        }
        case 'UPDATE_QUANTITY': {
            const updatedCartItem = action.payload
            const productId = updatedCartItem.id.productId
            const updatedList = state.cartItems.map((cartItem) =>
                productId === cartItem.id.productId ? updatedCartItem : cartItem
            )
            const updatedTotal = updatedList.reduce(
                (total, cartItem) =>
                    total + cartItem.product.price * cartItem.quantity,
                0
            )
            return {
                ...state,
                cartItems: updatedList,
                total: updatedTotal
            }
        }
        case 'REMOVE_CART': {
            const productId = action.payload
            const updatedList = state.cartItems.filter(
                (cartItem) => cartItem.id.productId !== productId
            )
            const updatedTotal = updatedList.reduce(
                (total, cartItem) =>
                    total + cartItem.product.price * cartItem.quantity,
                0
            )
            console.log(action)
            return {
                ...state,
                cartItems: updatedList,
                total: updatedTotal,
                quantity: state.quantity - 1
            }
        }
        case 'DELETE_ALL_CART': {
            return {
                cartItems: [],
                quantity: 0,
                total: 0
            }
        }
        case 'SET_CART': {
            const cartItems = action.payload
            const quantity = cartItems.reduce(
                (totalQuantity, cartItem) => totalQuantity + cartItem.quantity,
                0
            )
            const total = cartItems.reduce(
                (totalPrice, cartItem) =>
                    totalPrice + cartItem.product.price * cartItem.quantity,
                0
            )
            return {
                ...state,
                cartItems: cartItems,
                quantity: quantity,
                total: total
            }
        }
        default:
            return state
    }
}

export default cartReducer
