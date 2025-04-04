import CartPage from "../pages/CartPage/CartPage"
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage"
import FavoriteProductPage from "../pages/FavoriteProductPage/FavoriteProductPage"
import HomePage from "../pages/HomePage/HomePage"
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage"
import ProductPage from "../pages/ProductPage/ProductPage"
import SignInSignUp from "../pages/SigninSignup/SignInSignUp";
import OrderStatusPage from "../pages/OrderStatusPage/OrderStatusPage"

import Dashboard from "../admin/pages/Dashboard";
import Orders from "../admin/pages/Orders";
import Products from "../admin/pages/Products";
import Customers from "../admin/pages/Customers";
import AdminLayout from "../admin/layout/AdminLayout";
import Discounts from "../admin/pages/Discounts";
import Categories from "../admin/pages/Categories"
import OrderDetailsPage from "../pages/OrderDetailsPage/OrderDetailsPage"
import NotFoundPage from "../pages/NotFouldPage/NotFouldPage"
import OrderFeedbackPage from "../pages/OrderFeedbackPage/OrderFeedbackPage"
import AccountPage from "../pages/AccountPage/AccountPage"

import Profile from "../pages/AccountPage/PageChildren/Profile"
import EditEmail from "../pages/AccountPage/PageChildren/EditMail"
import EditPhone from "../pages/AccountPage/PageChildren/EditPhone"
import EditPassword from "../pages/AccountPage/PageChildren/EditPassword"
import NotificationPage from "../pages/NotificationPage/NotificationPage"
import VoucherPage from "../pages/VoucherPage/VoucherPage"
import LoginPage from "../admin/pages/LoginPage"
import OrderDetails from "../admin/pages/OrderDetails"
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage"
import MyAddress from "../pages/AccountPage/PageChildren/MyAddress"
import ProductDetails from "../admin/pages/ProductDetails"

const publicRoutes = [
    {
        path: "/sign-in",
        component: SignInSignUp,
        // Layout: null,
    },
    {
        path: "/sign-up",
        component: SignInSignUp,
        // Layout: null,
    },
    {
        path: "/forgot-password",
        component: ForgotPasswordPage,
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
        path: '/product/:id',
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
    },
    {
        path: '/orders',
        component: OrderStatusPage,
    },
    {
        path: '/orders/order-details',
        component: OrderDetailsPage,
    },
    {
        path: '/orders/order-feedback',
        component: OrderFeedbackPage,
    },
    {
        path: '/account/*',
        component: AccountPage,
    },
    {
        path: '/notifications',
        component: NotificationPage,
    },
    {
        path: '/vouchers',
        component: VoucherPage,
    },
    {
        path: "*",
        component: NotFoundPage,
        Layout: null
    }
]

const accountRoutes = [
    {
      path: "/profile",
      component: Profile,
    },
    {
      path: "/edit-email",
      component: EditEmail,
    },
    {
      path: "/edit-phone",
      component: EditPhone,
    },
    {
      path: "/edit-password",
      component: EditPassword,
    },
    {
        path: "/my-address",
        component: MyAddress,
      },
];

const privateRoutes = [
    
]

const adminRoutes = [
    {
        path: "/admin/",
        component: LoginPage,
        // Layout: AdminLayout,
    },
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
        path: "/admin/order-details/:id",
        component: OrderDetails,
        Layout: AdminLayout,
    },
    {
        path: "/admin/products",
        component: Products,
        Layout: AdminLayout,
    },
    {
        path: "/admin/product-details/:id",
        component: ProductDetails,
        Layout: AdminLayout,
    },
    {
        path: "/admin/categories",
        component: Categories,
        Layout: AdminLayout,
    },
    {
        path: "/admin/customers",
        component: Customers,
        Layout: AdminLayout,
    },
    {
        path: "/admin/discounts",
        component: Discounts,
        Layout: AdminLayout,
    },
];

export { publicRoutes , privateRoutes, adminRoutes , accountRoutes}