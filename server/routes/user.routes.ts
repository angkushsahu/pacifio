import { Router } from "express";
import {
	deleteUser,
	deleteUserForAdmin,
	getAllUsers,
	getSingleUser,
	getUser,
	updateRole,
	updateUser,
} from "../controllers";
import { authorizeRoles, isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/").get(isUserAuthenticated, getUser).delete(isUserAuthenticated, deleteUser);
router.route("/update").put(isUserAuthenticated, updateUser);
// admin routes
router.route("/all").get(isUserAuthenticated, authorizeRoles("admin"), getAllUsers);
router
	.route("/:id")
	.get(isUserAuthenticated, authorizeRoles("admin"), getSingleUser)
	.put(isUserAuthenticated, authorizeRoles("admin"), updateRole)
	.delete(isUserAuthenticated, authorizeRoles("admin"), deleteUserForAdmin);

export default router;
