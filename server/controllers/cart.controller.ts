import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares";
import { User, Cart, Product } from "../models";
import { ErrorHandler } from "../utils";

export const addToCart = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id, quantity } = req.params;
		const userId = res.locals.user.id;
		const user = await User.findById(userId);
		if (!user) {
			return next(new ErrorHandler("User not found", 404));
		}
		const product = await Product.findById(id);
		if (!product) {
			return next(new ErrorHandler("Product not found", 404));
		}
		// check if product quantity is lesser than the quantity about to be ordered
		if (product.stock < Number(quantity)) {
			return next(new ErrorHandler("Desired quantity not available currently", 400));
		}
		const items = { product: product._id, quantity: Number(quantity) };

		const cart = await Cart.findOne({ user: userId });
		if (!cart) {
			const cartItem = await (
				await Cart.create({ user: userId, items })
			).populate({
				path: "items",
				populate: { path: "product" },
			});
			return res
				.status(201)
				.json({ success: true, message: "Cart created successfully", cart: cartItem });
		}

		let itemAlreadyInCart: boolean = false;
		const cartLength = cart.items.length;
		for (let i = 0; i < cartLength; i++) {
			if (String(cart.items[i].product) === String(id)) {
				itemAlreadyInCart = true;
				cart.items[i].quantity = Number(quantity);
				break;
			}
		}

		if (itemAlreadyInCart) {
			await cart.save();
			const populateCart = await cart.populate({
				path: "items",
				populate: { path: "product" },
			});
			return res
				.status(200)
				.json({ success: true, message: "Updated successfully", cart: populateCart });
		}

		cart.items = [items, ...cart.items];
		await cart.save();
		const populateCart = await cart.populate({
			path: "items",
			populate: { path: "product" },
		});
		return res.json({
			success: true,
			message: "Product added to cart successfully",
			cart: populateCart,
		});
	},
);

export const getUserCartItems = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findById(res.locals.user.id);
		if (!user) {
			return next(new ErrorHandler("User not found", 404));
		}
		const cart = await Cart.findOne({ user: res.locals.user.id });
		if (!cart) {
			return res.status(200).json({ success: true, message: "Cart is empty", cart: null });
		}

		const cartProducts = await cart.populate({
			path: "items",
			populate: { path: "product" },
		});

		res.status(200).json({
			success: true,
			message: "Fetched all cart items successfully",
			cart: cartProducts,
		});
	},
);

export const deleteFromCart = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		const user = await User.findById(res.locals.user.id);
		if (!user) {
			return next(new ErrorHandler("User not found", 404));
		}
		const cart = await Cart.findOne({ user: res.locals.user.id });
		if (!cart) {
			return next(new ErrorHandler("Cart is empty", 400));
		}

		cart.items = cart.items.filter(item => String(item.product) !== String(id));
		await cart.save();
		const returnCart = await cart.populate({
			path: "items",
			populate: { path: "product" },
		});

		res.status(200).json({
			success: true,
			message: "Deleted from cart successfully",
			cart: returnCart,
		});
	},
);

export const deleteAllCartItems = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findById(res.locals.user.id);
		if (!user) {
			return next(new ErrorHandler("User not found", 404));
		}
		const cart = await Cart.findOne({ user: res.locals.user.id });
		if (!cart) {
			return next(new ErrorHandler("Cart is empty", 400));
		}

		cart.items = [];
		await cart.save();
		const returnCart = await cart.populate({
			path: "items",
			populate: { path: "product" },
		});

		res.status(200).json({
			success: true,
			message: "Cart cleared successfully",
			cart: returnCart,
		});
	},
);
