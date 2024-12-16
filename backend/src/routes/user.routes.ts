import express from "express";
const router = express.Router();

import { registerUser, loginUser, logout, } from "../controllers/auth.controller";
import { updateUser }  from "../controllers/updateUser.controller";
import isAuthenticated from "../middleware/auth.middleware";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/updateuser", isAuthenticated, updateUser);

export default router;
