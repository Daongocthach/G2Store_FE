export const addCategory = (data) => {
    return {
        type: 'ADD_CATEGORY',
        payload: data
    }
}

export const updateCategory = (data) => {
    return {
        type: 'UPDATE_CATEGORY',
        payload: data
    }
}

export const listCategories = (data) => {
    return {
        type: 'LIST_CATEGORIES',
        payload: data
    }
}
