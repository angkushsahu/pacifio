import { Dispatch, SetStateAction } from "react";
import { IProduct } from "./features";

export interface IProductImageSectionProps {
	images: { pic: string; publicUrl: string }[];
	name: string;
}

export interface IAlert {
	type: "error" | "warning" | "success";
	message: string;
}

export interface IProductCard {
	_id: string;
	image: string;
	name: string;
	description: string;
	numberOfReviews: number;
	price: number;
	ratings: number;
	stock: number;
}

export interface IFilterProps {
	showFilters: boolean;
	setShowFilters: Dispatch<SetStateAction<boolean>>;
	priceRange: string;
	setPriceRange: Dispatch<SetStateAction<string>>;
	setCategory: Dispatch<SetStateAction<string>>;
	ratings: string;
	setRatings: Dispatch<SetStateAction<string>>;
}

export interface ICartItemProps {
	item: {
		product: IProduct;
		quantity: number;
	};
}

export interface IShippingValues {
	address: string;
	city: string;
	pincode: string;
	phoneNumber: string;
	country: string;
	state: string;
}

export interface IConfirmOrderProductItemProps {
	name: string;
	price: number;
	quantity: number;
	image: string;
}

export interface ICreateNewProductValues {
	name: string;
	description: string;
	price: number;
	images: string[];
	category: "coolingpad" | "headset" | "mousepad" | "mouse" | "keyboard" | "";
	stock: number;
}

export interface IUpdateProductValues {
	name: string;
	description: string;
	price: number;
	category: string;
	stock: number;
}
