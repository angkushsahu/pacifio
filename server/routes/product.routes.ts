import { Router } from "express";
import {
	createProduct,
	deleteProduct,
	getAllOutOfStockProducts,
	getAllProducts,
	getAllProductsForAdmin,
	getOneProduct,
	updateProduct,
} from "../controllers";
import { authorizeRoles, isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/create").post(isUserAuthenticated, authorizeRoles("admin"), createProduct);
router.route("/all").get(getAllProducts);
router.route("/out-of-stock").get(isUserAuthenticated, authorizeRoles("admin"), getAllOutOfStockProducts);
router.route("/:id").get(getOneProduct);
router
	.route("/admin/all")
	.get(isUserAuthenticated, authorizeRoles("admin"), getAllProductsForAdmin);
router.route("/update/:id").put(isUserAuthenticated, authorizeRoles("admin"), updateProduct);
router.route("/delete/:id").delete(isUserAuthenticated, authorizeRoles("admin"), deleteProduct);

export default router;
