
import { combineReducers } from 'redux'
import authReducer from './auth'
import subCategoryReducer from './subCategory'
import cartReducer from './cart'
import categoriesReducer from './categories'
import providersReducer from './providers'
import productsReducer from './products'
const rootReducer = combineReducers({
    auth: authReducer,
    subCategory: subCategoryReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    providers: providersReducer,
    products: productsReducer
})

export default rootReducer