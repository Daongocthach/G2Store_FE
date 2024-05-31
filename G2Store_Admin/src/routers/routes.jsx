import { lazy } from 'react'
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'))
const Login = lazy(() => import('../pages/Login/Login'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))
const AuthLayout = lazy(() => import('../layouts/AuthLayout'))

const Users = lazy(() => import('../pages/Manage/Users/Users'))
const Chat = lazy(() => import('../pages/Chat/Chat'))
const AutoChat = lazy(() => import('../pages/Chat/AutoChat/AutoChat'))
const Categories = lazy(() => import('../pages/Manage/Categories/Categories'))
const Orders = lazy(() => import('../pages/Manage/Orders/Orders'))
const Products = lazy(() => import('../pages/Manage/Products/Products'))
const Shops = lazy(() => import('../pages/Manage/Shops/Shops'))
const Sellers = lazy(() => import('../pages/Manage/Sellers/Sellers'))

const publicRoutes = [
    { path: '/', component: Login, layout: AuthLayout },
    { path: '*', component: NotFound, layout: AuthLayout }
]

const privateRoutes = [
    { path: 'dashboard', component: Dashboard },
    { path: 'manage/users', component: Users },
    { path: 'manage/categories', component: Categories },
    { path: 'manage/products', component: Products },
    { path: 'manage/orders', component: Orders },
    { path: 'manage/shops', component: Shops },
    { path: 'manage/sellers', component: Sellers },
    { path: 'manage/auto-chat', component: AutoChat },
    { path: 'manage/chat', component: Chat }
]


export { publicRoutes, privateRoutes }