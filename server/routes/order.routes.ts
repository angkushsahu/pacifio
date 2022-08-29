import { Router } from "express";
import {
	createOrder,
	deleteOrder,
	getAllOrders,
	getOneOrder,
	myOrders,
	updateOrder,
} from "../controllers";
import { authorizeRoles, isUserAuthenticated } from "../middlewares";
const router = Router();

// admin routes
router.route("/all").get(isUserAuthenticated, authorizeRoles("admin"), getAllOrders);
router.route("/update/:id").put(isUserAuthenticated, authorizeRoles("admin"), updateOrder);
router.route("/delete/:id").delete(isUserAuthenticated, authorizeRoles("admin"), deleteOrder);
router.route("/admin/:id").get(isUserAuthenticated, authorizeRoles("admin"), getOneOrder);
// user routes
router.route("/create").post(isUserAuthenticated, createOrder);
router.route("/me").get(isUserAuthenticated, myOrders);
router.route("/:id").get(isUserAuthenticated, getOneOrder);

export default router;
