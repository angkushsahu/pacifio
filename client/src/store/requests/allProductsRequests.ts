import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../contants";

interface Queries {
	item: string;
	page: string;
	priceRange: string;
	category: string;
	ratings: string;
}

export const fetchAllProducts = createAsyncThunk(
	"products/fetchAllProducts",
	async ({ item, page, priceRange, category, ratings }: Queries) => {
		const requestString = category
			? `${API_URL}/product/all?item=${item}&page=${page}&price[gte]=0&price[lte]=${priceRange}&rating[gte]s=${ratings}&category=${category}`
			: `${API_URL}/product/all?item=${item}&page=${page}&price[gte]=0&price[lte]=${priceRange}&ratings[gte]=${ratings}`;
		const response = await fetch(requestString, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		return await response.json();
	},
);

export const fetchAllProductsForAdmin = createAsyncThunk(
	"products/fetchAllProductsForAdmin",
	async () => {
		const response = await fetch(`${API_URL}/product/admin/all`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		return await response.json();
	},
);

export const getAllOutOfStockProducts = createAsyncThunk(
	"products/getAllOutOfStockProducts",
	async () => {
		const response = await fetch(`${API_URL}/product/out-of-stock`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		return await response.json();
	},
);
