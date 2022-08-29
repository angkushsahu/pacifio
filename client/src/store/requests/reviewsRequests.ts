import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../contants";

interface AddReviewProps {
	productId: string;
	rating: number;
	message: string;
}

interface DeleteReviewProps {
	productId: string;
	id: string;
}

export const addReview = createAsyncThunk(
	"review/addReview",
	async ({ productId, rating, message }: AddReviewProps) => {
		const response = await fetch(`${API_URL}/review/create`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ productId, rating, message }),
		});
		return await response.json();
	},
);

export const getAllReviews = createAsyncThunk("review/getAllReviews", async (id: string) => {
	const response = await fetch(`${API_URL}/review/all/${id}`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});
	return await response.json();
});

export const deleteReview = createAsyncThunk(
	"review/deleteReview",
	async ({ productId, id }: DeleteReviewProps) => {
		const response = await fetch(`${API_URL}/review/delete/${productId}/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		return await response.json();
	},
);
