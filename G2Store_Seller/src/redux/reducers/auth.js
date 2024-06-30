const initialState = {
    keep_login: false,
    shop_name: '',
    avatar: '',
    shop_id: ''
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN': {
            return {
                ...state,
                keep_login: true
            }
        }
        case 'UPDATE_PROFILE': {
            return {
                ...state,
                shop_name: action?.payload?.shop_name,
                avatar: action?.payload?.avatar,
                shop_id: action?.payload?.shop_id
            }
        }
        case 'UPDATE_AVATAR': {
            return {
                ...state,
                avatar: action?.payload
            }
        }
        case 'LOGOUT': {
            localStorage.removeItem('atk')
            localStorage.removeItem('rtk')
            return {
                keep_login: false,
                shop_name: '',
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
