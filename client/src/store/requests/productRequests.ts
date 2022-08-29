import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateNewProductValues, IUpdateProductValues } from "../../types";
import { API_URL } from "../contants";

interface IUpdateProduct {
	id: string;
	values: IUpdateProductValues;
}

export const fetchOneProduct = createAsyncThunk("product/fetchOneProduct", async (id: string) => {
	// here id already contains the path /product/id --> no need to add /product manually
	const response = await fetch(`${API_URL}${id}`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});

export const createNewProduct = createAsyncThunk(
	"product/createNewProduct",
	async (values: ICreateNewProductValues) => {
		const response = await fetch(`${API_URL}/product/create`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(values),
		});
		return await response.json();
	},
);

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id: string) => {
	const response = await fetch(`${API_URL}/product/delete/${id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});

export const updateProduct = createAsyncThunk(
	"product/updateProduct",
	async ({ id, values }: IUpdateProduct) => {
		const response = await fetch(`${API_URL}/product/update/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(values),
		});
		return await response.json();
	},
);
