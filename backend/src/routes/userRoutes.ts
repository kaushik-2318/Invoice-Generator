import express from "express";
const router = express.Router();

import { registerUser, loginUser, logout } from "../controllers/userController";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

export default router;
