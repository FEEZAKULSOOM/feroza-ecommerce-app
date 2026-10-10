import React, { useContext } from 'react'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import Nav from './component/Nav.jsx'
import { userDataContext } from './context/UserContext'
import About from './pages/About.jsx'
import Collections from './pages/Collections.jsx'
import Contact from './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import { Route, Routes, Navigate } from 'react-router-dom'
import Cart from './pages/Cart.jsx'
import Order from './pages/Order.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx'
import { ToastContainer } from 'react-toastify'
import NotFound from './pages/NotFound.jsx'
import Ai from './pages/Ai.jsx'

function App() {
    let { userData } = useContext(userDataContext)

    return (
        <>
            <ToastContainer />
            
            {/* Always show the Nav bar on all pages */}
            <Nav />

            <Routes>
                {/* 1. Public Store Pages: Accessible by everyone */}
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product" element={<Product />} />
                <Route path="/productdetail/:productId" element={<ProductDetail />} />

                {/* 2. Authentication Pages */}
                <Route
                    path="/login"
                    element={
                        userData
                            ? <Navigate to="/" replace />
                            : <Login />
                    }
                />
                <Route
                    path="/registration"
                    element={
                        userData
                            ? <Navigate to="/" replace />
                            : <Registration />
                    }
                />

                {/* 3. Protected Actions: Require Login */}
                <Route
                    path="/cart"
                    element={
                        userData
                            ? <Cart />
                            : <Navigate to="/login" replace />
                    }
                />
                <Route
                    path="/placeorder"
                    element={
                        userData
                            ? <PlaceOrder />
                            : <Navigate to="/login" replace />
                    }
                />
                <Route
                    path="/order"
                    element={
                        userData
                            ? <Order />
                            : <Navigate to="/login" replace />
                    }
                />
                <Route
                    path="/order-confirmation"
                    element={
                        userData
                            ? <OrderConfirmation />
                            : <Navigate to="/login" replace />
                    }
                />

                {/* Catch-all 404 Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            
            <Ai />
        </>
    )
}

export default App