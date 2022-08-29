import { Router } from "express";
import { addToCart, deleteAllCartItems, deleteFromCart, getUserCartItems } from "../controllers";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/add/:id/:quantity").post(isUserAuthenticated, addToCart);
router.route("/all").get(isUserAuthenticated, getUserCartItems);
router.route("/delete/all").delete(isUserAuthenticated, deleteAllCartItems);
router.route("/delete/:id").delete(isUserAuthenticated, deleteFromCart);

export default router;
