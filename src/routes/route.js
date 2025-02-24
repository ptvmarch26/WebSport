import HomePage from "../pages/HomePage/HomePage"
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage"
import ProductPage from "../pages/ProductPage/ProductPage"
import SignInSignUp from "../pages/SigninSignup/SignInSignUp"

const publicRoutes = [
    {
        path: "/login",
        component: SignInSignUp,
        Layout: null,
    },
    {
        path: "/signup",
        component: SignInSignUp,
        Layout: null,
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
    }
]

const privateRoutes = [
    
]

export { publicRoutes , privateRoutes }