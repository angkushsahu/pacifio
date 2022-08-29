import { Router } from "express";
import { addReview, deleteReview, getAllReviews } from "../controllers";
import { authorizeRoles, isUserAuthenticated } from "../middlewares";
const router = Router();

// admin routes
router
	.route("/delete/:productId/:id")
	.delete(isUserAuthenticated, authorizeRoles("admin"), deleteReview);
// user routes
router.route("/create").post(isUserAuthenticated, addReview); // creates if does not exist and updates if exists already
router.route("/all/:id").get(getAllReviews);

export default router;
