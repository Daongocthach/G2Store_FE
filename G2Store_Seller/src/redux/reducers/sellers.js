const initialState = {
    sellers: []
  }
  const sellersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SELLER': {
            const updateIndex = state.sellers.findIndex(seller => seller.id === action.payload.id)
            return {
                ...state,
                sellers: [
                    ...state.sellers.slice(0, updateIndex),
                    action.payload,
                    ...state.sellers.slice(updateIndex + 1)
                ]
            }
        }
        case 'LIST_SELLERS':
            return {
              ...state,
              sellers: action.payload
            }
        default:
            return state
    }
  }
  export default sellersReducer