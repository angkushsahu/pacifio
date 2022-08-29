import { Schema } from "mongoose";
import { Product } from "../models";

const updateStock = async (productId: Schema.Types.ObjectId, quantity: number) => {
	try {
		const product = await Product.findById(productId);
		if (product && product.stock) {
			product.stock -= quantity;
			await product.save();
		}
		return { success: true, message: "Successfully updated product stock" };
	} catch (error: any) {
		return { success: false, message: "Unable to update product" };
	}
};

export default updateStock;
