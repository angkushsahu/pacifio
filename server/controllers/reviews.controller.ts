import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares";
import { Product } from "../models";
import { IReview, IReviewRequestBody } from "../types";
import { ErrorHandler } from "../utils";

export const addReview = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { productId, rating, message }: IReviewRequestBody = req.body;
		if (!productId || !rating || !message) {
			return next(new ErrorHandler("Please validate all the fields", 400));
		}
		const userId = res.locals?.user?.id;
		const userName = res.locals?.user?.name;
		const review: IReview = { userName, message, user: userId, rating: Number(rating) };

		const product = await Product.findById(productId);
		if (!product) {
			return next(new ErrorHandler("Product not found", 404));
		}
		const isReviewed = product.reviews.find(rev => rev.user.toString() === userId);
		if (isReviewed) {
			product?.reviews.forEach(rev => {
				if (rev.user.toString() === userId) {
					rev.rating = rating;
					rev.message = message;
				}
			});
		} else {
			product?.reviews.push(review);
			product.numberOfReviews = product.numberOfReviews + 1;
		}

		let total = 0;
		product?.reviews.forEach(rev => {
			total += rev.rating;
		});
		product.ratings = total / product.reviews.length;

		await product?.save();
		res.status(201).json({ success: true, message: "Review added successfully", review });
	},
);

export const getAllReviews = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product) {
			return next(new ErrorHandler("Product not found", 404));
		}

		res.status(200).json({
			success: true,
			message: "Fetched all reviews",
			reviews: product?.reviews,
		});
	},
);

export const deleteReview = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id, productId } = req.params;
		const product = await Product.findById(productId);
		if (!product) {
			return next(new ErrorHandler("Product not found", 404));
		}

		const reviews: IReview[] = product.reviews.filter(
			rev => rev._id?.toString() !== id?.toString(),
		);

		let total = 0;
		const numberOfReviews = reviews.length;
		reviews.forEach(rev => {
			total += rev.rating;
		});
		const ratings = numberOfReviews ? total / numberOfReviews : 0;

		await Product.findByIdAndUpdate(
			productId,
			{ reviews, ratings, numberOfReviews },
			{ new: true },
		);

		res.status(200).json({ success: true, message: "Reviews deleted successfully" });
	},
);
