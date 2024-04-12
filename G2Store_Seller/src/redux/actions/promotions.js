export const addPromotion = (data) => {
    return {
        type: 'ADD_PROMOTION',
        payload: data
    }
}

export const updatePromotion = (data) => {
    return {
        type: 'UPDATE_PROMOTION',
        payload: data
    }
}

export const deletePromotion = (data) => {
    return {
        type: 'DELETE_PROMOTION',
        payload: data
    }
}
export const listPromotions = (data) => {
    return {
        type: 'LIST_PROMOTIONS',
        payload: data
    }
}
