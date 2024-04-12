const initialState = {
    orders: []
}
const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ORDER':
            return {
                ...state,
                orders: [...state.orders, action.payload]
            }
        case 'UPDATE_ORDER_STATUS': {
            const updateIndex = state.orders.findIndex(order => order.id === action.payload.id)
            return {
                ...state,
                orders: [
                    ...state.orders.slice(0, updateIndex),
                    action.payload,
                    ...state.orders.slice(updateIndex + 1)
                ]
            }
        }
        case 'LIST_ORDERS':
            return {
              ...state,
              orders: action.payload
            }
        default:
            return state
    }
}
export default ordersReducer