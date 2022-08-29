import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../../types";
import {
	addToCart,
	deleteAllItemsFromCart,
	deleteFromCart,
	getAllCartItems,
} from "../requests/cartRequests";

const initialState = {
	loading: false,
	cart: { user: "", items: [] } as ICart,
	error: "",
	message: "",
};

interface ActionType {
	success: boolean;
	cart: ICart;
	message: string;
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {},
	extraReducers: builder => {
		// add to cart
		builder.addCase(addToCart.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.cart = action.payload.cart;
			state.loading = false;
			state.error = action.payload.success ? "" : action.payload.message;
			state.message = action.payload.message;
		});
		builder.addCase(addToCart.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// get all items present in cart
		builder.addCase(getAllCartItems.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(getAllCartItems.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.cart = action.payload.cart ? action.payload.cart : { user: "", items: [] };
			state.loading = false;
			state.error = action.payload.success ? "" : action.payload.message;
			state.message = action.payload.message;
		});
		builder.addCase(getAllCartItems.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// delete item from cart
		builder.addCase(deleteFromCart.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(deleteFromCart.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.cart = action.payload.cart;
			state.loading = false;
			state.error = action.payload.success ? "" : action.payload.message;
			state.message = action.payload.message;
		});
		builder.addCase(deleteFromCart.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// delete all items from cart
		builder.addCase(deleteAllItemsFromCart.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(
			deleteAllItemsFromCart.fulfilled,
			(state, action: PayloadAction<ActionType>) => {
				state.cart = action.payload.cart;
				state.loading = false;
				state.error = action.payload.success ? "" : action.payload.message;
				state.message = action.payload.message;
			},
		);
		builder.addCase(deleteAllItemsFromCart.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
	},
});

export default cartSlice.reducer;
export { addToCart, deleteFromCart, getAllCartItems, deleteAllItemsFromCart };
