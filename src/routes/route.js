import CartPage from "../pages/CartPage/CartPage"
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage"
import FavoriteProductPage from "../pages/FavoriteProductPage/FavoriteProductPage"
import HomePage from "../pages/HomePage/HomePage"
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage"
import ProductPage from "../pages/ProductPage/ProductPage"
import SignInSignUp from "../pages/SigninSignup/SignInSignUp";
import UserPage from "../pages/UserPage/UserPage";

import Dashboard from "../admin/pages/Dashboard";
import Orders from "../admin/pages/Orders";
import Products from "../admin/pages/Products";
import Users from "../admin/pages/Users";
import AdminLayout from "../admin/layout/AdminLayout";
import Discount from "../admin/pages/Discount";

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

const adminRoutes = [
    {
        path: "/admin/dashboard",
        component: Dashboard,
        Layout: AdminLayout,
    },
    {
        path: "/admin/orders",
        component: Orders,
        Layout: AdminLayout,
    },
    {
        path: "/admin/products",
        component: Products,
        Layout: AdminLayout,
    },
    {
        path: "/admin/users",
        component: Users,
        Layout: AdminLayout,
    },
    {
        path: "/admin/discount",
        component: Discount,
        Layout: AdminLayout,
    },
];

export { publicRoutes , privateRoutes, adminRoutes }