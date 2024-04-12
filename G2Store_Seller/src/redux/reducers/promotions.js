const initialState = {
  promotions: []
}
const promotionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PROMOTION':
      return {
        ...state,
        promotions: [...state.promotions, action.payload]
      }
    case 'UPDATE_PROMOTION': {
      const updateIndex = state.promotions.findIndex(promotion => promotion.id === action.payload.id)
      return {
        ...state,
        promotions: [
          ...state.promotions.slice(0, updateIndex),
          action.payload,
          ...state.promotions.slice(updateIndex + 1)
        ]
      }
    }
    case 'DELETE_PROMOTION': {
      const newPromotions = state.promotions.filter(promotion => promotion.id !== action.payload.id)
      return {
        ...state,
        promotions: newPromotions
      }
    }
    case 'LIST_PROMOTIONS':
      return {
        ...state,
        promotions: action.payload
      }
    default:
      return state
  }
}
export default promotionsReducer