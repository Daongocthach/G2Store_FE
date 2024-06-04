import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'))
const Login = lazy(() => import('../pages/Auth/Login/Login'))
const Register = lazy(() => import('../pages/Auth/Register/Register'))
const ResetPassword = lazy(() => import('../pages/Auth/ResetPassword/ResetPassword'))
const Cart = lazy(() => import('../pages/Cart/Cart'))
const Checkout = lazy(() => import('../pages/Checkout/Checkout'))
const Promotion = lazy(() => import('../pages/Promotion/Promotion'))
const GenreDetail = lazy(() => import('../pages/GenreDetail/GenreDetail'))
const ProductDetail = lazy(() => import('../pages/ProductDetail/ProductDetail'))
const Thanks = lazy(() => import('../pages/Thanks/Thanks'))
const Account = lazy(() => import('../pages/Account/Account'))
const ShopPage = lazy(() => import('../pages/ShopPage/ShopPage'))
const OrderFail = lazy(() => import('../pages/ErrorPage/OrderFail/OrderFail'))
const ProductNotExist = lazy(() => import('../pages/ErrorPage/ProductNotExist/ProductNotExist'))
const OrderDetail = lazy(() => import('../pages/OrderDetail/OrderDetail'))
const Notification = lazy(() => import('../pages/Notification/Notification'))
const PaymentFail = lazy(() => import('../pages/ErrorPage/PaymentFail/PaymentFail'))
const Chat = lazy(() => import('../pages/Chat/Chat'))

import AuthLayout from '../layouts/AuthLayout'
import NotFound from '../pages/ErrorPage/NotFound/NotFound'

const publicRoutes = [
    { path: '/login', component: Login, layout: AuthLayout },
    { path: '/register', component: Register, layout: AuthLayout },
    { path: '/reset-password', component: ResetPassword, layout: AuthLayout },
    { path: '/', component: Dashboard },
    { path: '/notification', component: Notification },
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