export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}
export const updateShopImage = (data) => {
    return {
        type: 'UPDATE_SHOP_IMAGE',
        payload: data
    }
}

export const updateProfile = (data) => {
    return {
        type: 'UPDATE_PROFILE',
        payload: data
    }
}
export const updateShopName = (data) => {
    return {
        type: 'UPDATE_SHOP_NAME',
        payload: data
    }
}
export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}


