import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReviews } from "../../types";
import { addReview, deleteReview, getAllReviews } from "../requests/reviewsRequests";

const initialState = {
	loading: false,
	reviews: [] as IReviews[],
	review: {},
	error: "",
	message: "",
};

interface ActionType {
	success: boolean;
	review: IReviews;
	reviews: IReviews[];
	message: string;
}

const reviewSlice = createSlice({
	name: "review",
	initialState,
	reducers: {},
	extraReducers: builder => {
		// add review
		builder.addCase(addReview.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(addReview.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.review = action.payload.review;
			state.loading = false;
			state.error = action.payload.success ? "" : action.payload.message;
			state.message = action.payload.message;
		});
		builder.addCase(addReview.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// get all reviews
		builder.addCase(getAllReviews.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(getAllReviews.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.reviews = action.payload.reviews;
			state.loading = false;
			state.error = action.payload.success ? "" : action.payload.message;
			state.message = action.payload.message;
		});
		builder.addCase(getAllReviews.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// delete a review
		builder.addCase(deleteReview.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(deleteReview.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.error = action.payload.success ? "" : action.payload.message;
			state.message = action.payload.message;
		});
		builder.addCase(deleteReview.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
	},
});

export default reviewSlice.reducer;
export { addReview, deleteReview, getAllReviews };
