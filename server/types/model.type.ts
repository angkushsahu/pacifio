import { Document, Schema } from "mongoose";

interface IReturnUser {
	name: string;
	email: string;
	pic: string;
	role: "admin" | "user";
	_id: string;
}

export interface ICart {
	_id: Schema.Types.ObjectId;
	user: Schema.Types.ObjectId;
	items: {
		product: Schema.Types.ObjectId;
		quantity: number;
	}[];
}

export interface IUser extends Document {
	_id: Schema.Types.ObjectId;
	name: string;
	email: string;
	password: string;
	pic: string;
	publicUrl: string;
	role: "user" | "admin";
	resetPassword: string;
	getUser(): IReturnUser;
	comparePassword(enteredPassword: string): Promise<boolean>;
	getJWTToken(): string;
	getResetPasswordToken(): string;
}

export interface IReview {
	_id?: Schema.Types.ObjectId;
	user: Schema.Types.ObjectId;
	userName: string;
	rating: number;
	message: string;
}

export interface IProduct {
	_id: Schema.Types.ObjectId;
	name: string;
	description: string;
	price: number;
	ratings: number;
	images: { pic: string; publicUrl: string }[];
	category: "coolingpad" | "headset" | "mousepad" | "mouse" | "keyboard";
	stock: number;
	numberOfReviews: number;
	reviews: IReview[];
	createdAt: Date;
}

export interface IOrder {
	shippingInfo: {
		address: string;
		city: string;
		state: string;
		country: string;
		pinCode: number;
		phone: number;
	};
	orderItems: {
		name: string;
		quantity: number;
		price: number;
		product: Schema.Types.ObjectId;
	}[];
	user: Schema.Types.ObjectId;
	paymentInfo: {
		id: string;
		status: string;
	};
	paidAt: Date;
	itemsPrice: number;
	shippingPrice: number;
	totalPrice: number;
	orderStatus: "Processing" | "Shipped" | "Delivered";
	deliveredAt: Date | number;
	createdAt: Date;
}
