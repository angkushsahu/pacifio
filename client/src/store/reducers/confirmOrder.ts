import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConfirmOrder, IShippingValues } from "../../types";

const initialState: IConfirmOrder = {
	shippingDetails: {
		address: sessionStorage.getItem("address") || "",
		city: sessionStorage.getItem("city") || "",
		pincode: sessionStorage.getItem("pincode") || "",
		phoneNumber: sessionStorage.getItem("phoneNumber") || "",
		country: sessionStorage.getItem("country") || "",
		state: sessionStorage.getItem("state") || "",
	},
	subTotal: 0,
};

const confirmOrderSlice = createSlice({
	name: "confirmOrder",
	initialState,
	reducers: {
		addShippingDetails: (state, action: PayloadAction<IShippingValues>) => {
			state.shippingDetails = action.payload;
		},
		addSubtotal: (state, action: PayloadAction<number>) => {
			state.subTotal = action.payload;
		},
	},
});

export default confirmOrderSlice.reducer;
export const { addShippingDetails, addSubtotal } = confirmOrderSlice.actions;
