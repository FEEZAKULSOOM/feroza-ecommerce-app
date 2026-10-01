import express from "express";
import { getUserCart , addToCart , updateCart} from "../controller/cardController.js";
import isAuth from "../middleware/isAuth.js";

const cartRoutes = express.Router(); 

cartRoutes.post("/getusercart", isAuth , getUserCart );
cartRoutes.post("/addtocart", isAuth , addToCart );
cartRoutes.post("/updatecart", isAuth , updateCart );
export default cartRoutes
