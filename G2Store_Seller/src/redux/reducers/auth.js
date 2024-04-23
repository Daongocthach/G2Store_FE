const initialState = {
    avatar: '',
    shop_id: ''
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN': {
            return {
                ...state,
                atk: action?.payload
            }
        }
        case 'UPDATE_PROFILE': {
            return {
                ...state,
                avatar: action?.payload?.avatar,
                shop_id: action?.payload?.shop_id
            }
        }
        case 'LOGOUT': {
            localStorage.removeItem('atk')
            localStorage.removeItem('rtk')
            localStorage.removeItem('expireTime')
            return {
                avatar: '',
                shop_id: ''
            }
        }
        default: {
            return state
        }
    }
}

export default authReducer
