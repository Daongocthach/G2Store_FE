export const updateShop = (data) => {
    return {
        type: 'UPDATE_SHOP',
        payload: data
    }
}

export const listShops = (data) => {
    return {
        type: 'LIST_SHOPS',
        payload: data
    }
}
