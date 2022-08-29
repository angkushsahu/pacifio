import { IShippingValues } from "./components";

export interface IProduct {
	_id: string;
	name: string;
	description: string;
	price: number;
	ratings: number;
	// images: string[];
	images: { pic: string; publicUrl: string }[];
	category: string;
	stock: number;
	numberOfReviews: number;
	reviews: IReviews[];
	createdAt: number; // ------> not sure which will be better, number or Date (original date)
}

export interface IAllProducts {
	products: IProduct[];
	numberOfProducts: number;
	outOfStockProducts: IProduct[];
	outOfStockProductsQuantity: number;
	resultPerPage: number;
	success: boolean;
	message: string;
}

export interface IUser {
	name: string;
	email: string;
	pic: string;
	role: "user" | "admin";
	_id: string;
}

export interface IReviews {
	_id?: string;
	user: IUser;
	userName: string;
	rating: number;
	message: string;
}

export interface ICart {
	items: {
		product: IProduct;
		quantity: number;
	}[];
	user: string;
}

export interface IConfirmOrder {
	shippingDetails: IShippingValues;
	subTotal: number;
}

export interface ICreateOrder {
	shippingInfo: {
		address: string;
		city: string;
		state: string;
		country: string;
		pincode: string;
		phoneNumber: string;
	};
	orderItems: {
		name: string;
		quantity: number;
		price: number;
		product: string;
	}[];
	paymentInfo: {
		id: string;
		status: string;
	};
	itemsPrice: number;
	shippingPrice: number;
	totalPrice: number;
}

export interface IOrder {
	_id?: string;
	shippingInfo: {
		address: string;
		city: string;
		state: string;
		country: string;
		pincode: string;
		phoneNumber: string;
	};
	orderItems: {
		name: string;
		quantity: number;
		price: number;
		product: IProduct;
	}[];

	user: any; // change it later
	paymentInfo: {
		id: string;
		status: string;
	};
	paidAt: number;
	itemsPrice: number;
	shippingPrice: number;
	totalPrice: number;
	orderStatus: string;
	deliveredAt: number;
	createdAt: number;
}
