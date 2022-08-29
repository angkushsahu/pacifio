import { Schema, model } from "mongoose";
import { IProduct } from "../types";

const productSchema = new Schema(
	{
		name: { type: String, required: [true, "Please enter the name of the product"] },
		description: { type: String, required: [true, "Please describe about the product"] },
		price: { type: Number, required: [true, "Please enter the price of the product"] },
		ratings: { type: Number, default: 0 },
		images: [{ pic: { type: String } }, { publicUrl: { type: String } }],
		category: { type: String, required: [true, "Please enter category of the product"] },
		stock: { type: Number, required: [true, "Please enter product quantity"] },
		numberOfReviews: { type: Number, default: 0 },
		reviews: [
			{
				user: { type: Schema.Types.ObjectId, ref: "User", required: true },
				userName: { type: String, required: [true, "Please enter your name"] },
				rating: { type: Number, required: [true, "Please enter a rating for the product"] },
				message: { type: String, required: [true, "Please comment for your review"] },
			},
		],
		createdAt: { type: Date, default: Date.now },
	},
	{ timestamps: true },
);

export default model<IProduct>("Product", productSchema);
