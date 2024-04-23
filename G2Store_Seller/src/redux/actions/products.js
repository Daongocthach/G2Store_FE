export const addProduct = (data) => {
    return {
        type: 'ADD_PRODUCT',
        payload: data
    }
}

export const updateProduct = (data) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: data
    }
}
export const deleteProduct = (productId) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: productId
    }
}
export const listProducts = (data) => {
    return {
        type: 'LIST_PRODUCTS',
        payload: data
    }
}
