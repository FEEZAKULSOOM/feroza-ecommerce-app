import express from "express";
import { registration ,login , googleLogin,logout ,adminLogin} from "../controller/authController.js";

const authRoutes = express.Router();
authRoutes.post("/registration", registration);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/googlelogin", googleLogin);
authRoutes.post("/adminlogin" , adminLogin)


export default authRoutes;