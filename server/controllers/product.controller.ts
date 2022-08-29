import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares";
import { Product } from "../models";
import { ApiFeatures, ErrorHandler, cloudinaryConfig } from "../utils";

export const createProduct = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const images: { pic: string; publicUrl: string }[] = [];
		const imagesLength = req.body.images.length;
		for (let i = 0; i < imagesLength; i++) {
			const image = req.body.images[i];
			let setPic: string = "";
			let setPublicUrl: string = "";
			if (image) {
				const uploadImage = await cloudinaryConfig.uploader.upload(image, {
					folder: "pacifio/products",
					use_filename: true,
				});
				setPic = uploadImage.secure_url;
				setPublicUrl = uploadImage.public_id;
				images.push({ pic: setPic, publicUrl: setPublicUrl });
			}
		}

		const { price, description, name, stock, category } = req.body;
		const newProductObj = {
			price,
			description,
			name,
			stock,
			category,
			images,
		};

		const newProduct = await Product.create(newProductObj);
		if (!newProduct) {
			return next(new ErrorHandler("Unable to create new product", 500));
		}

		res.status(201).json({
			success: true,
			message: "New product created",
			product: newProduct,
		});
	},
);

export const getAllProducts = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const resultPerPage = 10; // original value --> 10
		const numberOfProducts = await Product.countDocuments();
		const apiFeatures = new ApiFeatures(Product.find(), req.query)
			.search()
			.filter()
			.pagination(resultPerPage);
		const products = await apiFeatures.query;

		res.status(200).json({
			success: true,
			message: "Fetched all products",
			numberOfProducts,
			resultPerPage,
			products,
		});
	},
);

export const getAllProductsForAdmin = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const products = await Product.find();

		res.status(200).json({
			success: true,
			message: "Fetched all products",
			numberOfProducts: products.length,
			products,
		});
	},
);

export const getAllOutOfStockProducts = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const products = await Product.find();

		if (!products) {
			return next(new ErrorHandler("Unable to fetch products", 500));
		}

		let outOfStockProductsQuantity = 0;
		let outOfStockProducts = [];
		for (let i = 0; i < products.length; i++) {
			if (products[i].stock <= 0) {
				outOfStockProductsQuantity++;
				outOfStockProducts.push(products[i]);
			}
		}

		res.status(200).json({
			success: true,
			message: "Fetched all products",
			outOfStockProductsQuantity,
			outOfStockProducts,
		});
	},
);

export const getOneProduct = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product) {
			return next(new ErrorHandler("Product not found", 404));
		}

		res.status(200).json({ success: true, message: "Fetched product successfully", product });
	},
);

export const updateProduct = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		let product = await Product.findById(id);
		if (!product) {
			return next(new ErrorHandler("Product not found", 404));
		}

		product = await Product.findByIdAndUpdate(id, req.body, { new: true });
		res.status(200).json({ success: true, message: "Product updated successfully", product });
	},
);

export const deleteProduct = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const product = await Product.findById(id);

		if (!product) {
			return next(new ErrorHandler("Product not found", 404));
		}

		if (product.images) {
			const imagesLength = product.images.length;
			for (let i = 0; i < imagesLength; i++) {
				const image = product.images[i];
				await cloudinaryConfig.uploader.destroy(image.publicUrl);
			}
		}

		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted successfully" });
	},
);
