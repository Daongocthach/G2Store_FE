import DashBoard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Auth/Login/Login'
import Register from '../pages/Auth/Register/Register'
import ResetPassword from '../pages/Auth/ResetPassword/ResetPassword'
import NotFound from '../pages/NotFound/NotFound'
import Profile from '../pages/Profile/Profile'
import ShopProfile from '../pages/Profile/ShopProfile'
import AuthLayout from '../layouts/AuthLayout'
import Chat from '../pages/Chat/Chat'
import AutoChat from '../pages/Chat/AutoChat/AutoChat'
import Sellers from '../pages/Manage/Sellers/Sellers'
import Promotions from '../pages/Manage/Promotions/Promotions'
import AddPromotion from '../pages/Manage/Promotions/AddPromotion/AddPromotion'
import Orders from '../pages/Manage/Orders/Orders'
import Products from '../pages/Manage/Products/Products'
import AddProduct from '../pages/Manage/Products/AddProduct/AddProduct'
import ManageReviews from '../pages/Manage/Orders/MangeReivews/ManageReviews'
import AddSeller from '../pages/Manage/Sellers/AddSeller/AddSeller'
import Categories from '../pages/Manage/Categories/Categories'
import DesignShop from '../pages/Manage/DesignShop/DesignShop'
import AccessDenied from '../pages/AccessDenied/AccessDenied'

const publicRoutes = [
    { path:'/', component: Login, layout: AuthLayout },
    { path:'/register', component: Register, layout: AuthLayout },
    { path:'/reset-password', component: ResetPassword, layout: AuthLayout },
    { path:'*', component: NotFound, layout: AuthLayout }
]

const privateRoutes = [
    { path:'dashboard', component: DashBoard },
    { path:'shop-profile', component: ShopProfile },
    { path:'profile', component: Profile },
    { path:'chat', component: Chat },
    { path:'auto-chat', component: AutoChat },
    { path:'manage/sellers', component: Sellers },
    { path:'manage/add-seller', component: AddSeller },
    { path:'manage/products', component: Products },
    { path:'manage/add-product', component: AddProduct },
    { path:'manage/promotions', component: Promotions },
    { path:'manage/add-promotion', component: AddPromotion },
    { path:'manage/orders', component: Orders },
    { path:'manage/reviews', component: ManageReviews },
    { path:'manage/categories', component: Categories },
    { path:'manage/design-shop', component: DesignShop },
    { path:'access-denied', component: AccessDenied }


]


export { publicRoutes, privateRoutes }