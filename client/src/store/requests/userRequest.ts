import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin, IResetPassword, ISignUp, IUpdateAccount } from "../../types";
import { API_URL } from "../contants";

export const getUser = createAsyncThunk("user/getUser", async () => {
	const response = await fetch(`${API_URL}/user`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});

export const userLogin = createAsyncThunk("user/login", async (values: ILogin) => {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(values),
	});
	return await response.json();
});

export const userSignup = createAsyncThunk("user/signup", async (values: ISignUp) => {
	const response = await fetch(`${API_URL}/auth/signup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(values),
	});
	return await response.json();
});

export const updateUser = createAsyncThunk("user/update", async (values: IUpdateAccount) => {
	const response = await fetch(`${API_URL}/user/update`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(values),
	});
	return await response.json();
});

export const userLogout = createAsyncThunk("user/logout", async () => {
	const response = await fetch(`${API_URL}/auth/logout`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});

export const deleteUser = createAsyncThunk("user/delete", async () => {
	const response = await fetch(`${API_URL}/user`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});

export const forgotPassword = createAsyncThunk("user/forgotPassword", async (email: string) => {
	const response = await fetch(`${API_URL}/auth/forgot-password`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ email }),
	});
	return await response.json();
});

export const resetPassword = createAsyncThunk(
	"user/resetPassword",
	async (values: IResetPassword & { id: string }) => {
		const response = await fetch(`${API_URL}/auth${values.id}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(values),
		});
		return await response.json();
	},
);

export const getAllUsersForAdmin = createAsyncThunk("userAdmin/getAllUsersForAdmin", async () => {
	const response = await fetch(`${API_URL}/user/all`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});

export const getOneUserForAdmin = createAsyncThunk(
	"userAdmin/getOneUserForAdmin",
	async (id: string) => {
		const response = await fetch(`${API_URL}/user/${id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		return await response.json();
	},
);

export const updateUserRole = createAsyncThunk(
	"userAdmin/updateUserRole",
	async ({ id, role }: { id: string; role: string }) => {
		const response = await fetch(`${API_URL}/user/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ role }),
		});
		return await response.json();
	},
);

export const deleteUserForAdmin = createAsyncThunk(
	"userAdmin/deleteUserForAdmin",
	async (id: string) => {
		const response = await fetch(`${API_URL}/user/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		return await response.json();
	},
);
