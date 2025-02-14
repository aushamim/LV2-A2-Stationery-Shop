import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { USER_ROLE } from "./user.interface";
import { PasswordUpdateValidationSchema, UserLoginValidationSchema, UserUpdateValidationSchema, UserValidationSchema } from "./user.validation";

const router = express.Router();

// Register User / Create User
router.post("/auth/register", validateRequest(UserValidationSchema), UserController.register);

// Login User
router.post("/auth/login", validateRequest(UserLoginValidationSchema), UserController.login);

// Update User Data
router.patch("/user/:userId/update", auth(USER_ROLE.ADMIN, USER_ROLE.USER), validateRequest(UserUpdateValidationSchema), UserController.updateUser);

// Update User Data
router.patch(
  "/user/:userId/change-password",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(PasswordUpdateValidationSchema),
  UserController.changePass,
);

// Activate User
router.post("/user/:userId/activate", auth(USER_ROLE.ADMIN), UserController.activateUser);

// Deactivate User
router.post("/user/:userId/deactivate", auth(USER_ROLE.ADMIN), UserController.deactivateUser);

export const UserRoutes = router;
