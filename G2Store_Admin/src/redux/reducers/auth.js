const initialState = {
    atk:''
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN': {
            return {
                ...state,
                atk: action.payload
            }
        }

        case 'LOGOUT': {
            return {
                atk:''
            }
        }

        default: {
            return state
        }
    }
}

export default authReducer
