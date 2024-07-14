const initialState = {
    customer_id: '',
    keep_login: false,
    avatar: '',
    point: 0
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN': {
            return {
                ...state,
                keep_login: true
            }
        }
        case 'UPDATE_AVATAR': {
            return {
                ...state,
                avatar: action?.payload?.avatar,
                point: action?.payload?.point,
                customer_id: action?.payload?.customer_id
            }
        }
        case 'LOGOUT': {
            localStorage.removeItem('atk')
            localStorage.removeItem('rtk')
            return {
                customer_id: '',
                keep_login: false,
                avatar: '',
                point: 0
            }
        }

        default: {
            return state
        }
    }
}

export default authReducer
