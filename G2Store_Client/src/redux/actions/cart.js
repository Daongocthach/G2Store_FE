export const addToCart = (data) => {
    return {
        type: 'ADD_TO_CART',
        payload: data
    }
}

export const removeFromCart = (data) => {
    return {
        type: 'REMOVE_CART',
        payload: data
    }
}
export const deleteAllCart = () => {
    return {
        type: 'DELETE_ALL_CART'
    }
}
export const updateQuantity = (data) => {
    return {
        type: 'UPDATE_QUANTITY',
        payload: data
    }
}
export const setCart = (data) => {
    return {
        type: 'SET_CART',
        payload: data
    }
}


