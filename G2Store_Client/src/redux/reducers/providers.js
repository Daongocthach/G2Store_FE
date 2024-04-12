const initialState = {
  providers: []
}
const providersReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'ADD_PROVIDER':
          return {
              ...state,
              providers: [...state.providers, action.payload]
          }
      case 'UPDATE_PROVIDER': {
          const updateIndex = state.providers.findIndex(provider => provider.id === action.payload.id)
          return {
              ...state,
              providers: [
                  ...state.providers.slice(0, updateIndex),
                  action.payload,
                  ...state.providers.slice(updateIndex + 1)
              ]
          }
      }
      case 'LIST_PROVIDERS':
          return {
            ...state,
            providers: action.payload
          }
      default:
          return state
  }
}
export default providersReducer