const initialState = {
    users: []
  }
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER': {
            const updateIndex = state.users.findIndex(user => user.id === action.payload.id)
            return {
                ...state,
                users: [
                    ...state.users.slice(0, updateIndex),
                    action.payload,
                    ...state.users.slice(updateIndex + 1)
                ]
            }
        }
        case 'LIST_USERS':
            return {
              ...state,
              users: action.payload
            }
        default:
            return state
    }
  }
  export default usersReducer