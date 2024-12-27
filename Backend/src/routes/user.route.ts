import * as express from "express";
import { authentification } from "../middleware/auth.middleware";
import { handleValidationErrors } from "../middleware/validation.middleware";
import { UserController } from "../controllers/User.controller";
import { authorization } from "../middleware/authorization.middleware";
import { AuthController } from "../controllers/Auth.controller";
import {
  validateSignup,
  validateLogin,
  validateUpdateUser,
} from "../validators/User.validator";

const Router = express.Router();

Router.get(
  "/users",
  authentification,
  authorization([ "admin"]),
  UserController.getUsers
);
Router.get(
  "/profile",
  authentification,
  authorization(["user", "admin"]),
  AuthController.getProfile
);

Router.post(
  "/signup",
  validateSignup,
  handleValidationErrors,
  UserController.signup
);
Router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  AuthController.login
);
Router.post(
  "/validateSesion",
  authentification,
  AuthController.validateToken
);

Router.put(
  "/update/:id",
  validateUpdateUser,
  handleValidationErrors,
  authentification,
  authorization(["user", "admin"]),
  UserController.updateUser
);

Router.delete(
  "/delete/:id",
  authentification,
  authorization(["admin"]),
  UserController.deleteUser
);
export { Router as userRouter };
