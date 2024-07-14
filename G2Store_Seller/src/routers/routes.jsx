import Dashboard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Auth/Login/Login'
import Register from '../pages/Auth/Register/Register'
import ResetPassword from '../pages/Auth/ResetPassword/ResetPassword'
import InputOtp from '../pages/Auth/InputOtp/InputOtp'
import Profile from '../pages/Profile/Profile'
import ShopProfile from '../pages/Profile/ShopProfile'
import Chat from '../pages/Chat/Chat'
import AutoChat from '../pages/Chat/AutoChat/AutoChat'
import Sellers from '../pages/Manage/Sellers/Sellers'
import Vouchers from '../pages/Manage/Vouchers/Vouchers'
import AddVoucher from '../pages/Manage/Vouchers/AddVoucher/AddVoucher'
import Orders from '../pages/Manage/Orders/Orders'
import Products from '../pages/Manage/Products/Products'
import AddProduct from '../pages/Manage/Products/AddProduct/AddProduct'
import ManageReviews from '../pages/Manage/Orders/MangeReviews/ManageReviews'
import AddSeller from '../pages/Manage/Sellers/AddSeller/AddSeller'
import Categories from '../pages/Manage/Categories/Categories'
import AccessDenied from '../pages/AccessDenied/AccessDenied'

import AuthLayout from '../layouts/AuthLayout'
import NotFound from '../pages/NotFound/NotFound'

const publicRoutes = [
    { path:'/', component: Login, layout: AuthLayout },
    { path:'/input-otp', component: InputOtp, layout: AuthLayout },
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
    { path:'access-denied', component: AccessDenied }
]


export { publicRoutes, privateRoutes }