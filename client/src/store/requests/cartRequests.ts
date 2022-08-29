import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../contants";

export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async ({ id, quantity }: { id: string; quantity: string }) => {
		const response = await fetch(`${API_URL}/cart/add/${id}/${quantity}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		return await response.json();
	},
);

export const getAllCartItems = createAsyncThunk("cart/getAllCartItems", async () => {
	const response = await fetch(`${API_URL}/cart/all`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});

export const deleteFromCart = createAsyncThunk("cart/deleteFromCart", async (id: string) => {
	const response = await fetch(`${API_URL}/cart/delete/${id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});

export const deleteAllItemsFromCart = createAsyncThunk("cart/deleteAllItemsFromCart", async () => {
	const response = await fetch(`${API_URL}/cart/delete/all`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});
