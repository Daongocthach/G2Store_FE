export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}


export const updateAvatar = (data) => {
    return {
        type: 'UPDATE_AVATAR',
        payload: data
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}


