import DashBoard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'
import AuthLayout from '../layouts/AuthLayout'
import Users from '../pages/Manage/Users/Users'
import Chat from '../pages/Chat/Chat'
import AutoChat from '../pages/Chat/AutoChat/AutoChat'
import Categories from '../pages/Manage/Categories/Categories'
import Orders from '../pages/Manage/Orders/Orders'
import Products from '../pages/Manage/Products/Products'
import Shops from '../pages/Manage/Shops/Shops'
const publicRoutes = [
    { path:'/', component: Login, layout: AuthLayout },
    { path:'*', component: NotFound, layout: AuthLayout }
]

const privateRoutes = [
    { path:'dashboard', component: DashBoard },
    { path:'manage/users', component: Users },
    { path:'manage/categories', component: Categories },
    { path:'manage/products', component: Products },
    { path:'manage/orders', component: Orders },
    { path:'manage/shops', component: Shops },
    { path:'manage/auto-chat', component: AutoChat },
    { path:'manage/chat', component: Chat }
]


export { publicRoutes, privateRoutes }