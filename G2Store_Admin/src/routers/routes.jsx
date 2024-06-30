import Dashboard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Login/Login'
import Customers from '../pages/Manage/Customers/Customers'
import Chat from '../pages/Chat/Chat'
import AutoChat from '../pages/Chat/AutoChat/AutoChat'
import Categories from '../pages/Manage/Categories/Categories'
import Orders from '../pages/Manage/Orders/Orders'
import Products from '../pages/Manage/Products/Products'
import Shops from '../pages/Manage/Shops/Shops'
import Sellers from '../pages/Manage/Sellers/Sellers'


import NotFound from '../pages/NotFound/NotFound'
import AuthLayout from '../layouts/AuthLayout'

const publicRoutes = [
    { path: '/', component: Login, layout: AuthLayout },
    { path: '*', component: NotFound, layout: AuthLayout }
]

const privateRoutes = [
    { path: 'dashboard', component: Dashboard },
    { path: 'manage/customers', component: Customers },
    { path: 'manage/categories', component: Categories },
    { path: 'manage/products', component: Products },
    { path: 'manage/orders', component: Orders },
    { path: 'manage/shops', component: Shops },
    { path: 'manage/sellers', component: Sellers },
    { path: 'manage/auto-chat', component: AutoChat },
    { path: 'manage/chat', component: Chat }
]


export { publicRoutes, privateRoutes }