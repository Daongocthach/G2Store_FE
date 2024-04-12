export const addOrder = (data) => {
    return {
        type: 'ADD_ORDER',
        payload: data
    }
}

export const updateOrder = (data) => {
    return {
        type: 'UPDATE_ORDER_STATUS',
        payload: data
    }
}

export const deleteOrder = (data) => {
    return {
        type: 'DELETE_ORDER',
        payload: data
    }
}
export const listOrders = (data) => {
    return {
        type: 'LIST_ORDERS',
        payload: data
    }
}
