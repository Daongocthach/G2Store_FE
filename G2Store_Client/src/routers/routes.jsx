import DashBoard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Auth/Login/Login'
import Register from '../pages/Auth/Register/Register'
import ResetPassword from '../pages/Auth/ResetPassword/ResetPassword'
import Cart from '../pages/Cart/Cart'
import Checkout from '../pages/Checkout/Checkout'
import Promotion from '../pages/Promotion/Promotion'
import GenreDetail from '../pages/GenreDetail/GenreDetail'
import NotFound from '../pages/ErrorPage/NotFound/NotFound'
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import AuthLayout from '../layouts/AuthLayout'
import Thanks from '../pages/Thanks/Thanks'
import Account from '../pages/Account/Account'
import ShopPage from '../pages/ShopPage/ShopPage'
import OrderFail from '../pages/ErrorPage/OrderFail/OrderFail'
import ProductNotExist from '../pages/ErrorPage/ProductNotExist/ProductNotExist'
import OrderDetail from '../pages/OrderDetail/OrderDetail'
import Notification from '../pages/Notification/Notification'
import PaymentFail from '../pages/ErrorPage/PaymentFail/PaymentFail'

const publicRoutes = [
    { path: '/login', component: Login, layout: AuthLayout },
    { path: '/register', component: Register, layout: AuthLayout },
    { path: '/reset-password', component: ResetPassword, layout: AuthLayout },
    { path: '/', component: DashBoard },
    { path: '/notification', component: Notification },
    { path: '/promotion', component: Promotion },
    { path: '/genre-detail', component: GenreDetail },
    { path: '/product-detail', component: ProductDetail },
    { path: '/shop-page', component: ShopPage },
    { path: '/order-fail', component: OrderFail },
    { path: '/product-not-exist', component: ProductNotExist },
    { path: '/payment-fail', component:  PaymentFail},
    { path: '*', component: NotFound }
]
const privateRoutes = [
    { path: '/profile', component: Account },
    { path: '/checkout', component: Checkout },
    { path: '/profile/order-detail', component: OrderDetail },
    { path: '/thanks', component: Thanks },
    { path: '/cart', component: Cart }
]

export { publicRoutes, privateRoutes }