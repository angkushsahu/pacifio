import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { catchAsyncErrors } from "../middlewares";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2022-08-01" });

export const processPayment = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { amount } = req.body;
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "inr",
			metadata: { company: "Pacifio" },
		});

		res.status(200).json({
			success: true,
			message: "Payment processed successfully",
			clientSecret: payment.client_secret,
		});
	},
);

export const getStripApiKey = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		res.status(200).json({
			success: true,
			message: "Fetched successfully",
			stripeApiKey: process.env.STRIPE_API_KEY,
		});
	},
);
