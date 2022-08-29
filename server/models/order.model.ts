import { Schema, model } from "mongoose";
import { IOrder } from "../types";

const orderSchema = new Schema(
	{
		shippingInfo: {
			address: { type: String, required: [true, "Please enter shipping address"] },
			city: { type: String, required: [true, "Please enter shipping city"] },
			state: { type: String, required: [true, "Please enter shipping state"] },
			country: { type: String, required: [true, "Please enter shipping country"] },
			pincode: { type: Number, required: [true, "Please enter your pincode"] },
			phoneNumber: { type: Number, required: [true, "Please enter your phone number"] },
		},
		orderItems: [
			{
				name: { type: String, required: [true, "Please enter product name"] },
				quantity: { type: Number, required: [true, "Please enter product quantity"] },
				price: { type: Number, required: [true, "Please enter product price"] },
				product: {
					type: Schema.Types.ObjectId,
					ref: "Product",
					required: [true, "Enter product"],
				},
			},
		],
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		paymentInfo: {
			id: { type: String, required: [true, "Please enter payment id"] },
			status: { type: String, required: [true, "Please enter payment status"] },
		},
		paidAt: { type: Date, required: true },
		itemsPrice: { type: Number, default: 0 },
		shippingPrice: { type: Number, default: 0 },
		totalPrice: { type: Number, default: 0 },
		orderStatus: {
			type: String,
			default: "Processing",
		},
		deliveredAt: { type: Date },
		createdAt: { type: Date, default: Date.now },
	},
	{ timestamps: true },
);

export default model<IOrder>("Order", orderSchema);
