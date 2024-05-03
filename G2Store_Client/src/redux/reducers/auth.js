const initialState = {
    keep_login: false,
    avatar: ''
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
                avatar: action?.payload
            }
        }
        case 'LOGOUT': {
            localStorage.removeItem('atk')
            localStorage.removeItem('rtk')
            return {
                keep_login: false,
                avatar: ''
            }
        }

        default: {
            return state
        }
    }
}

export default authReducer
