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
import { ToastContainer, toast } from 'react-toastify'
import NotFound from './pages/NotFound.jsx'
import Ai from './pages/Ai.jsx'

function App() {

    let { userData } = useContext(userDataContext)

    return (
        <>
            <ToastContainer />
            {userData && <Nav />}

            <Routes>

                <Route
                    path="/login"
                    element={
                        userData
                            ? <Home />
                            : <Login />
                    }
                />

                <Route
                    path="/registration"
                    element={
                        userData
                            ? <Home />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/order-confirmation"
                    element={<OrderConfirmation />}
                />

                <Route
                    path="/"
                    element={
                        userData
                            ? <Home />
                            : <Login />
                    }
                />

                <Route
                    path="/about"
                    element={
                        userData
                            ? <About />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/collections"
                    element={
                        userData
                            ? <Collections />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/productdetail/:productId"
                    element={
                        userData
                            ? <ProductDetail />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/cart"
                    element={
                        userData
                            ? <Cart/>
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/contact"
                    element={
                        userData
                            ? <Contact />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/placeorder"
                    element={
                        userData
                            ? <PlaceOrder />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/order"
                    element={
                        userData
                            ? <Order />
                            : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/product"
                    element={
                        userData
                            ? <Product />
                            : <Navigate to="/login" />
                    }
                />

                {/* Catch-all 404 Route placed at the very end */}
                <Route path="*" element={<NotFound />} />

            </Routes>
            <Ai/>
        </>
    )
}

export default App