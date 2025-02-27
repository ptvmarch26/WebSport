import CartPage from "../pages/CartPage/CartPage"
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage"
import FavoriteProductPage from "../pages/FavoriteProductPage/FavoriteProductPage"
import HomePage from "../pages/HomePage/HomePage"
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage"
import ProductPage from "../pages/ProductPage/ProductPage"
import SignInSignUp from "../pages/SigninSignup/SignInSignUp"

const publicRoutes = [
    {
        path: "/login",
        component: SignInSignUp,
        // Layout: null,
    },
    {
        path: "/signup",
        component: SignInSignUp,
        // Layout: null,
    },
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/product',
        component: ProductPage,
    },
    {
        path: '/product-details',
        component: ProductDetailsPage,
    },
    {
        path: '/cart',
        component: CartPage,
    },
    {
        path: '/checkout',
        component: CheckOutPage,
    },
    {
        path: '/favorite',
        component: FavoriteProductPage,
    }
]

const privateRoutes = [
    
]

export { publicRoutes , privateRoutes }