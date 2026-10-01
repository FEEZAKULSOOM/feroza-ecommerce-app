import express from "express";
import { allOrders, placeOrder, placeOrderSafePay, updateOrderStatus, verifySafePay } from "../controller/orderController.js";
import isAuth from "../middleware/isAuth.js";
import { userOrders } from "../controller/orderController.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRoutes = express.Router();
  //for user

orderRoutes.post ('/placeorder' , isAuth , placeOrder)
orderRoutes.post ('/userorders' , isAuth , userOrders)
orderRoutes.post ('/orderbysafepay' , isAuth , placeOrderSafePay)
orderRoutes.post ('/verifysafepay' , isAuth , verifySafePay)


  // for admin
orderRoutes.post ('/list',  adminAuth ,allOrders)
orderRoutes.post ('/status' , adminAuth, updateOrderStatus)

export default orderRoutes