export const addProvider = (data) => {
    return {
        type: 'ADD_PROVIDER',
        payload: data
    }
}

export const updateProvider = (data) => {
    return {
        type: 'UPDATE_PROVIDER',
        payload: data
    }
}

export const listProviders = (data) => {
    return {
        type: 'LIST_PROVIDERS',
        payload: data
    }
}
