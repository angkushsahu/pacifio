import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAllProducts, IProduct } from "../../types";
import {
	fetchAllProducts,
	fetchAllProductsForAdmin,
	getAllOutOfStockProducts,
} from "../requests/allProductsRequests";

const initialState = {
	loading: false,
	products: [] as IProduct[],
	numberOfProducts: 0,
	resultPerPage: 0,
	outOfStockProducts: [] as IProduct[],
	outOfStockProductsQuantity: 0,
	error: "",
};

const allProductsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: builder => {
		// fetch all products
		builder.addCase(fetchAllProducts.pending, state => {
			state.loading = true;
			state.products = [];
			state.numberOfProducts = 0;
			state.resultPerPage = 0;
			state.error = "";
		});
		builder.addCase(
			fetchAllProducts.fulfilled,
			(state, action: PayloadAction<IAllProducts>) => {
				state.loading = false;
				state.products = action.payload.products;
				state.numberOfProducts = action.payload.numberOfProducts;
				state.resultPerPage = action.payload.resultPerPage;
				state.error = "";
			},
		);
		builder.addCase(fetchAllProducts.rejected, (state, action) => {
			state.loading = false;
			state.products = [];
			state.numberOfProducts = 0;
			state.resultPerPage = 0;
			state.error = action.error.message || "Something went wrong";
		});
		// fetch all products for admin
		builder.addCase(fetchAllProductsForAdmin.pending, state => {
			state.loading = true;
			state.products = [];
			state.numberOfProducts = 0;
			state.error = "";
		});
		builder.addCase(
			fetchAllProductsForAdmin.fulfilled,
			(state, action: PayloadAction<IAllProducts>) => {
				state.loading = false;
				state.products = action.payload.products;
				state.numberOfProducts = action.payload.numberOfProducts;
				state.error = "";
			},
		);
		builder.addCase(fetchAllProductsForAdmin.rejected, (state, action) => {
			state.loading = false;
			state.products = [];
			state.numberOfProducts = 0;
			state.error = action.error.message || "Something went wrong";
		});
		// get out of stock products
		builder.addCase(getAllOutOfStockProducts.pending, state => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(
			getAllOutOfStockProducts.fulfilled,
			(state, action: PayloadAction<IAllProducts>) => {
				state.loading = false;
				state.outOfStockProducts = action.payload.outOfStockProducts;
				state.outOfStockProductsQuantity = action.payload.outOfStockProductsQuantity;
				state.error = "";
			},
		);
		builder.addCase(getAllOutOfStockProducts.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
		});
	},
});

export default allProductsSlice.reducer;
export { fetchAllProducts, fetchAllProductsForAdmin, getAllOutOfStockProducts };
