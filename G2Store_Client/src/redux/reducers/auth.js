const initialState = {
    atk: '',
    avatar: ''
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN': {
            return {
                ...state,
                atk: action?.payload
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
            localStorage.removeItem('expireTime')
            return {
                atk: '',
                avatar: ''
            }
        }

        default: {
            return state
        }
    }
}

export default authReducer
