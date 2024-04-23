export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}


export const updateProfile = (data) => {
    return {
        type: 'UPDATE_PROFILE',
        payload: data
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}


