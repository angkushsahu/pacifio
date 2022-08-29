import { Schema, model } from "mongoose";
import { ICart } from "../types";

const cartSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Please enter user id"],
		},
		items: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: "Product",
					required: [true, "Please enter product id"],
				},
				quantity: { type: Number, default: 1 },
			},
		],
	},
	{ timestamps: true },
);

export default model<ICart>("Cart", cartSchema);
