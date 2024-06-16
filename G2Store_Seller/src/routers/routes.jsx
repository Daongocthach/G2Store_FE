import { lazy } from 'react'
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'))
const Login = lazy(() => import('../pages/Auth/Login/Login'))
const Register = lazy(() => import('../pages/Auth/Register/Register'))
const ResetPassword = lazy(() => import('../pages/Auth/ResetPassword/ResetPassword'))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const ShopProfile = lazy(() => import('../pages/Profile/ShopProfile'))
const Chat = lazy(() => import('../pages/Chat/Chat'))
const AutoChat = lazy(() => import('../pages/Chat/AutoChat/AutoChat'))
const Sellers = lazy(() => import('../pages/Manage/Sellers/Sellers'))
const Vouchers = lazy(() => import('../pages/Manage/Vouchers/Vouchers'))
const AddVoucher = lazy(() => import('../pages/Manage/Vouchers/AddVoucher/AddVoucher'))
const Orders = lazy(() => import('../pages/Manage/Orders/Orders'))
const Products = lazy(() => import('../pages/Manage/Products/Products'))
const AddProduct = lazy(() => import('../pages/Manage/Products/AddProduct/AddProduct'))
const ManageReviews = lazy(() => import('../pages/Manage/Orders/MangeReviews/ManageReviews'))
const AddSeller = lazy(() => import('../pages/Manage/Sellers/AddSeller/AddSeller'))
const Categories = lazy(() => import('../pages/Manage/Categories/Categories'))
const AccessDenied = lazy(() => import('../pages/AccessDenied/AccessDenied'))
const CreateOrderGhn = lazy(() => import('../pages/Manage/Orders/CreateOrderGhn/CreateOrderGhn'))

import AuthLayout from '../layouts/AuthLayout'
import NotFound from '../pages/NotFound/NotFound'

const publicRoutes = [
    { path:'/', component: Login, layout: AuthLayout },
    { path:'/register', component: Register, layout: AuthLayout },
    { path:'/reset-password', component: ResetPassword, layout: AuthLayout },
    { path:'*', component: NotFound, layout: AuthLayout }
]

const privateRoutes = [
    { path:'dashboard', component: Dashboard },
    { path:'shop-profile', component: ShopProfile },
    { path:'profile', component: Profile },
    { path:'chat', component: Chat },
    { path:'auto-chat', component: AutoChat },
    { path:'manage/sellers', component: Sellers },
    { path:'manage/add-seller', component: AddSeller },
    { path:'manage/products', component: Products },
    { path:'manage/add-product', component: AddProduct },
    { path:'manage/vouchers', component: Vouchers },
    { path:'manage/add-voucher', component: AddVoucher },
    { path:'manage/orders', component: Orders },
    { path:'manage/reviews', component: ManageReviews },
    { path:'manage/categories', component: Categories },
    { path:'access-denied', component: AccessDenied },
    { path:'manage/create-order-ghn', component: CreateOrderGhn },



]


export { publicRoutes, privateRoutes }