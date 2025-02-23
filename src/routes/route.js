import HomePage from "../pages/HomePage/HomePage"
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
    }

]

const privateRoutes = [
    
]

export { publicRoutes , privateRoutes }