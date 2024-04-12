export const updateSeller = (data) => {
    return {
        type: 'UPDATE_SELLER',
        payload: data
    }
}

export const listSellers = (data) => {
    return {
        type: 'LIST_SELLERS',
        payload: data
    }
}
