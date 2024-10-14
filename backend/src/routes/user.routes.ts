import express from "express";
const router = express.Router();

import { registerUser, loginUser, logout } from "../controllers/auth.controller";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

export default router;
