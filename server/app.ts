import express, { Request, Response } from "express";
const app = express();

app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
app.use(express.json({ limit: "1000mb" }));

import cors from "cors";
app.use(cors({ credentials: true, origin: true }));

import cookieParser from "cookie-parser";
app.use(cookieParser());

// import routes here
import {
	authRouter,
	cartRouter,
	orderRouter,
	paymentRouter,
	productRouter,
	reviewRouter,
	userRouter,
} from "./routes";
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/review", reviewRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRouter);

// --------------- DEPLOYMENT ---------------

import { join } from "path";
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req: Request, res: Response) => {
		res.status(200).sendFile(join(__dirname, "../client", "build", "index.html"));
	});
} else {
	app.get("/", (req: Request, res: Response) => {
		res.status(200).send("Running API in development mode");
	});
}

// --------------- DEPLOYMENT ---------------

// // import error-middleware here
app.use((req: Request, res: Response) => {
	res.status(404).json({ success: false, message: "Please enter a valid api url" });
});
import { error } from "./middlewares";
app.use(error);

export default app;
