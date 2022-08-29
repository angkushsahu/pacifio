import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares";
import { User } from "../models";
import { IUpdateUser } from "../types";
import { cloudinaryConfig, ErrorHandler, validateEmail } from "../utils";

export const getUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user;
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	res.status(200).json({
		success: true,
		message: "User found successfully",
		user: user.getUser(),
	});
});

export const getAllUsers = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const users = await User.find().select("name email pic role _id");

		res.status(200).json({ success: true, message: "Users fetched successfully", users });
	},
);

export const updateUser = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = res.locals.user;
		if (!user) {
			return next(new ErrorHandler("User not found", 400));
		}
		const id = user.id;
		const { name, email, pic }: IUpdateUser = req.body;
		if (!validateEmail(email)) {
			return next(new ErrorHandler("E-mail format is invalid", 400));
		}
		let newUserData;
		if (pic) {
			if (user.publicUrl) {
				await cloudinaryConfig.uploader.destroy(user.publicUrl);
			}
			const uploadImage = await cloudinaryConfig.uploader.upload(pic, {
				folder: "pacifio/users",
				use_filename: true,
			});
			const setPic = uploadImage.secure_url;
			const setPublicUrl = uploadImage.public_id;
			newUserData = { name, email, pic: setPic, publicUrl: setPublicUrl };
		} else {
			newUserData = { name, email };
		}

		const updatedUser = await User.findByIdAndUpdate(id, newUserData, { new: true });
		res.status(200).json({
			success: true,
			message: "User account updated successfully",
			user: updatedUser?.getUser(),
		});
	},
);

export const getSingleUser = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const user = await User.findById(id);
		if (!user) {
			return next(new ErrorHandler("User not found", 404));
		}

		res.status(200).json({
			success: true,
			message: "User found successfully",
			user: user.getUser(),
		});
	},
);

export const updateRole = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { role } = req.body;
		const { id } = req.params;
		const user = await User.findById(id);
		if (!user) {
			return next(new ErrorHandler("User not found", 404));
		}

		user.role = role;
		await user.save();

		res.status(200).json({
			success: true,
			message: "User role updated successfully",
			user: user?.getUser(),
		});
	},
);

export const deleteUser = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.findById(res.locals.user.id);
		if (!user) {
			return next(new ErrorHandler("User not found", 404));
		}

		if (user.publicUrl) {
			await cloudinaryConfig.uploader.destroy(user.publicUrl);
		}
		res.clearCookie("pacifioToken");
		await user.remove();
		res.status(200).json({ success: true, message: "User account deleted successfully" });
	},
);

export const deleteUserForAdmin = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const user = await User.findById(id);
		if (!user) {
			return next(new ErrorHandler("User not found", 404));
		}

		if (user.publicUrl) {
			await cloudinaryConfig.uploader.destroy(user.publicUrl);
		}
		await user.remove();
		res.status(200).json({ success: true, message: "User account deleted successfully" });
	},
);
