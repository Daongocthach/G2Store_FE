import Dashboard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Auth/Login/Login'
import Register from '../pages/Auth/Register/Register'
import ResetPassword from '../pages/Auth/ResetPassword/ResetPassword'
import Cart from '../pages/Cart/Cart'
import Checkout from '../pages/Checkout/Checkout'
import Promotion from '../pages/Promotion/Promotion'
import GenreDetail from '../pages/GenreDetail/GenreDetail'
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import Thanks from '../pages/Thanks/Thanks'
import Account from '../pages/Account/Account'
import ShopPage from '../pages/ShopPage/ShopPage'
import OrderFail from '../pages/ErrorPage/OrderFail/OrderFail'
import ProductNotExist from '../pages/ErrorPage/ProductNotExist/ProductNotExist'
import OrderDetail from '../pages/OrderDetail/OrderDetail'
import PaymentFail from '../pages/ErrorPage/PaymentFail/PaymentFail'
import Chat from '../pages/Chat/Chat'

import AuthLayout from '../layouts/AuthLayout'
import NotFound from '../pages/ErrorPage/NotFound/NotFound'

const publicRoutes = [
    { path: '/login', component: Login, layout: AuthLayout },
    { path: '/register', component: Register, layout: AuthLayout },
    { path: '/reset-password', component: ResetPassword, layout: AuthLayout },
    { path: '/', component: Dashboard },
    { path: '/promotion', component: Promotion },
    { path: '/genre-detail', component: GenreDetail },
    { path: '/product-detail', component: ProductDetail },
    { path: '/shop-page', component: ShopPage },
    { path: '/order-fail', component: OrderFail },
    { path: '/product-not-exist', component: ProductNotExist },
    { path: '/payment-fail', component: PaymentFail },
    { path: '*', component: NotFound }
]
const privateRoutes = [
    { path: '/profile', component: Account },
    { path: '/checkout', component: Checkout },
    { path: '/profile/order-detail', component: OrderDetail },
    { path: '/thanks', component: Thanks },
    { path: '/cart', component: Cart },
    { path: '/chat', component: Chat }

]

export { publicRoutes, privateRoutes }