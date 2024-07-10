const initialState = {
    keep_login: false,
    shop_name: '',
    shop_image: '',
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
                shop_id: action?.payload
            }
        }
        case 'UPDATE_SHOP_NAME': {
            return {
                ...state,
                shop_name: action?.payload
            }
        }
        case 'UPDATE_SHOP_IMAGE': {
            return {
                ...state,
                shop_image: action?.payload
            }
        }
        case 'LOGOUT': {
            localStorage.removeItem('atk')
            localStorage.removeItem('rtk')
            return {
                keep_login: false,
                shop_name: '',
                shop_image: '',
                shop_id: ''
            }
        }
        default: {
            return state
        }
    }
}

export default authReducer
