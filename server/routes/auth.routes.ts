import { Router } from "express";
import { forgotPassword, login, logout, resetPassword, signup } from "../controllers";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(isUserAuthenticated, logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:id").post(resetPassword);

export default router;
