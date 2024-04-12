export const updateUser = (data) => {
    return {
        type: 'UPDATE_USER',
        payload: data
    }
}

export const listUsers = (data) => {
    return {
        type: 'LIST_USERS',
        payload: data
    }
}
