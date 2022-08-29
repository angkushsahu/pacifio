import { Router } from "express";
import { getStripApiKey, processPayment } from "../controllers";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/process").post(isUserAuthenticated, processPayment);
router.route("/get-key").get(isUserAuthenticated, getStripApiKey);

export default router;
