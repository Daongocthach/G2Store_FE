
import { combineReducers } from 'redux'
import authReducer from './auth'
import ordersReducer from './orders'
import categoriesReducer from './categories'
import productsReducer from './products'
import sellersReducer from './sellers'
import promotionsReducer from './promotions'

const rootReducer = combineReducers({
    auth: authReducer,
    orders: ordersReducer,
    categories: categoriesReducer,
    products: productsReducer,
    sellers: sellersReducer,
    promotions: promotionsReducer
})

export default rootReducer