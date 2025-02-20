import HomePage from "../pages/HomePage/HomePage"
import ProductPage from "../pages/ProductPage/ProductPage"

const publicRoutes = [
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