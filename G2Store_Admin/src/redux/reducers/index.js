
import { combineReducers } from 'redux'
import authReducer from './auth'
import ordersReducer from './orders'
import categoriesReducer from './categories'
import productsReducer from './products'
import usersReducer from './users'
import shopsReducer from './shops'

const rootReducer = combineReducers({
    auth: authReducer,
    orders: ordersReducer,
    categories: categoriesReducer,
    products: productsReducer,
    users: usersReducer,
    shops: shopsReducer
})

export default rootReducer