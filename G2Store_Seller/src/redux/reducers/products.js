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
            const updateIndex = state.products.findIndex(product => product.product_id === action.payload.product_id)
            return {
                ...state,
                products: [
                    ...state.products.slice(0, updateIndex),
                    action.payload,
                    ...state.products.slice(updateIndex + 1)
                ]
            }
        }
        case 'DELETE_PRODUCT': {
            const newProducts = state.products.filter(product => product.product_id !== action.payload)
            return {
              ...state,
              products: newProducts
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