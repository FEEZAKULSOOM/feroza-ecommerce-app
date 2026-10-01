

import express from "express";
import { getAdmin, getCurrentUser } from "../controller/userController.js";
import isAuth  from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";


const userRoutes = express.Router();

// GET /api/auth/getcurrentuser
userRoutes.get("/getcurrentuser", isAuth, getCurrentUser);
userRoutes.get("/getadmin", adminAuth, getAdmin);

export default userRoutes;