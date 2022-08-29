import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares";
import { Order } from "../models";
import { ErrorHandler, updateStock } from "../utils";

export const createOrder = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { shippingInfo, orderItems, paymentInfo, itemsPrice, shippingPrice, totalPrice } =
			req.body;

		const order = await Order.create({
			shippingInfo,
			orderItems,
			paymentInfo,
			itemsPrice,
			shippingPrice,
			totalPrice,
			paidAt: Date.now(),
			user: res.locals?.user?.id,
		});

		if (!order) {
			return next(new ErrorHandler("Unable to place order, please try again", 500));
		}

		res.status(201).json({ success: true, message: "Order placed successfully", order });
	},
);

export const getOneOrder = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const order = await Order.findById(id)
			?.populate("user", "name email")
			.populate({
				path: "orderItems",
				populate: { path: "product" },
			});
		if (!order) {
			return next(new ErrorHandler("Order not found", 404));
		}

		res.status(200).json({ success: true, message: "Order found successfully", order });
	},
);

export const myOrders = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const orders = await Order.find({ user: res.locals?.user?.id });

		res.status(200).json({ success: true, message: "Orders found successfully", orders });
	},
);

export const getAllOrders = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const orders = await Order.find();

		let totalAmount = 0;
		orders.forEach(order => {
			totalAmount += order.totalPrice;
		});

		res.status(200).json({
			success: true,
			message: "Orders fetched successfully",
			totalAmount,
			orders,
		});
	},
);

export const updateOrder = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const { status }: { status: "Processing" | "Shipped" | "Delivered" } = req.body;
		const order = await Order.findById(id);
		if (!order) {
			return next(new ErrorHandler("Order not found", 404));
		}
		if (order.orderStatus === "Delivered") {
			return next(new ErrorHandler("Order already delivered", 400));
		}
		if (status !== "Processing" && status !== "Shipped" && status !== "Delivered") {
			return next(new ErrorHandler("Invalid order status", 400));
		}
		if (status === "Shipped") {
			const orderItemsLength = order.orderItems.length;
			for (let i = 0; i < orderItemsLength; i++) {
				const orderItem = order.orderItems[i];
				const { success, message } = await updateStock(
					orderItem.product,
					orderItem.quantity,
				);
				if (!success) {
					return next(new ErrorHandler(message || "", 400));
				}
			}
		}

		order.orderStatus = status;
		if (status === "Delivered") {
			order.deliveredAt = Date.now();
		}
		await order.save();

		res.status(200).json({ success: true, message: "Order updated successfully", order });
	},
);

export const deleteOrder = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const order = await Order.findById(id);
		if (!order) {
			return next(new ErrorHandler("Order not found", 404));
		}

		await order.remove();

		res.status(200).json({ success: true, message: "Order deleted successfully" });
	},
);
