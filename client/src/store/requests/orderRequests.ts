import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateOrder } from "../../types";
import { API_URL } from "../contants";

export const createOrder = createAsyncThunk("order/createOrder", async (order: ICreateOrder) => {
	const response = await fetch(`${API_URL}/order/create`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(order),
	});
	return await response.json();
});

export const getMyOrders = createAsyncThunk("order/getMyOrders", async () => {
	const response = await fetch(`${API_URL}/order/me`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});

export const getOneOrder = createAsyncThunk("order/getOneOrder", async (id: string) => {
	const response = await fetch(`${API_URL}/order/${id}`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});

export const getOneOrderForAdmin = createAsyncThunk(
	"order/getOneOrderForAdmin",
	async (id: string) => {
		const response = await fetch(`${API_URL}/order/admin/${id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		return await response.json();
	},
);

export const getAllOrdersForAdmin = createAsyncThunk("order/getAllOrdersForAdmin", async () => {
	const response = await fetch(`${API_URL}/order/all`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});

export const updateOrderStatus = createAsyncThunk(
	"order/updateOrderStatus",
	async ({ id, status }: { id: string; status: string }) => {
		const response = await fetch(`${API_URL}/order/update/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ status }),
		});
		return await response.json();
	},
);

export const deleteOrderAdmin = createAsyncThunk("order/deleteOrderAdmin", async (id: string) => {
	const response = await fetch(`${API_URL}/order/delete/${id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});
