import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

// Register
router.post("/register", UserController.register);

// Login
router.post("/login", UserController.login);

export const UserRoutes = router;
