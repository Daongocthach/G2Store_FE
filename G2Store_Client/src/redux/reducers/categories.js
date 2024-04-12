const initialState = {
  categories: []
}
const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'ADD_CATEGORY':
          return {
              ...state,
              categories: [...state.categories, action.payload]
          }
      case 'UPDATE_CATEGORY': {
          const updateIndex = state.categories.findIndex(category => category.id === action.payload.id)
          return {
              ...state,
              categories: [
                  ...state.categories.slice(0, updateIndex),
                  action.payload,
                  ...state.categories.slice(updateIndex + 1)
              ]
          }
      }
      case 'LIST_CATEGORIES':
          return {
            ...state,
            categories: action.payload
          }
      default:
          return state
  }
}
export default categoriesReducer