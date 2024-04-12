const initialState = {
    shops: []
  }
  const shopsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SHOP': {
            const updateIndex = state.shops.findIndex(shop => shop.id === action.payload.id)
            return {
                ...state,
                shops: [
                    ...state.shops.slice(0, updateIndex),
                    action.payload,
                    ...state.shops.slice(updateIndex + 1)
                ]
            }
        }
        case 'LIST_SHOPS':
            return {
              ...state,
              shops: action.payload
            }
        default:
            return state
    }
  }
  export default shopsReducer