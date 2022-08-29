import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types";
import {
	createNewProduct,
	deleteProduct,
	fetchOneProduct,
	updateProduct,
} from "../requests/productRequests";

const initialState = {
	loading: false,
	error: "",
	product: {} as IProduct,
};

interface ActionType {
	success: boolean;
	product: IProduct;
	message: string;
}

const oneProductSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers: builder => {
		// fetch one product
		builder.addCase(fetchOneProduct.pending, state => {
			state.loading = true;
			state.product = {} as IProduct;
			state.error = "";
		});
		builder.addCase(fetchOneProduct.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.product = action.payload.product;
			state.error = "";
		});
		builder.addCase(fetchOneProduct.rejected, (state, action) => {
			state.loading = false;
			state.product = {} as IProduct;
			state.error = action.error.message || "Something went wrong";
		});
		// create a new product
		builder.addCase(createNewProduct.pending, state => {
			state.loading = true;
			state.product = {} as IProduct;
			state.error = "";
		});
		builder.addCase(createNewProduct.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.product = action.payload.product;
			state.error = "";
		});
		builder.addCase(createNewProduct.rejected, (state, action) => {
			state.loading = false;
			state.product = {} as IProduct;
			state.error = action.error.message || "Something went wrong";
		});
		// update a product
		builder.addCase(updateProduct.pending, state => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.product = action.payload.product;
			state.error = "";
		});
		builder.addCase(updateProduct.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
		});
		// delete a product
		builder.addCase(deleteProduct.pending, state => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(deleteProduct.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.error = "";
		});
		builder.addCase(deleteProduct.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
		});
	},
});

export default oneProductSlice.reducer;
export { fetchOneProduct, createNewProduct, deleteProduct, updateProduct };
