const initialState = {
    products: []
  }
  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case 'UPDATE_PRODUCT': {
            const updateIndex = state.products.findIndex(product => product.id === action.payload.id)
            return {
                ...state,
                products: [
                    ...state.products.slice(0, updateIndex),
                    action.payload,
                    ...state.products.slice(updateIndex + 1)
                ]
            }
        }
        case 'LIST_PRODUCTS':
            return {
              ...state,
              products: action.payload
            }
        default:
            return state
    }
  }
  export default productsReducer