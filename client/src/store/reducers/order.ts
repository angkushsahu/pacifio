import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../types";
import {
	createOrder,
	deleteOrderAdmin,
	getAllOrdersForAdmin,
	getMyOrders,
	getOneOrder,
	getOneOrderForAdmin,
	updateOrderStatus,
} from "../requests/orderRequests";

const initialState = {
	loading: false,
	allOrders: [] as IOrder[],
	order: {} as IOrder,
	totalAmount: 0,
	error: "",
	message: "",
};

interface IOrderAction {
	success: boolean;
	message: string;
	order: IOrder;
}

interface IGetMyOrders {
	success: boolean;
	message: string;
	orders: IOrder[];
	totalAmount: number;
}

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers: builder => {
		// create order
		builder.addCase(createOrder.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(createOrder.fulfilled, (state, action: PayloadAction<IOrderAction>) => {
			state.order = action.payload.order;
			state.loading = false;
			state.error = action.payload.success ? "" : action.payload.message;
			state.message = action.payload.message;
		});
		builder.addCase(createOrder.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// get all my orders
		builder.addCase(getMyOrders.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(getMyOrders.fulfilled, (state, action: PayloadAction<IGetMyOrders>) => {
			state.allOrders = action.payload.orders;
			state.loading = false;
			state.error = action.payload.success ? "" : action.payload.message;
			state.message = action.payload.message;
		});
		builder.addCase(getMyOrders.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// get one order
		builder.addCase(getOneOrder.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(getOneOrder.fulfilled, (state, action: PayloadAction<IOrderAction>) => {
			state.order = action.payload.order;
			state.loading = false;
			state.error = action.payload.success ? "" : action.payload.message;
			state.message = action.payload.message;
		});
		builder.addCase(getOneOrder.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// get one order -- admin
		builder.addCase(getOneOrderForAdmin.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(
			getOneOrderForAdmin.fulfilled,
			(state, action: PayloadAction<IOrderAction>) => {
				state.order = action.payload.order;
				state.loading = false;
				state.error = action.payload.success ? "" : action.payload.message;
				state.message = action.payload.message;
			},
		);
		builder.addCase(getOneOrderForAdmin.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// get all orders -- admin route
		builder.addCase(getAllOrdersForAdmin.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(
			getAllOrdersForAdmin.fulfilled,
			(state, action: PayloadAction<IGetMyOrders>) => {
				state.allOrders = action.payload.orders;
				state.totalAmount = action.payload.totalAmount;
				state.loading = false;
				state.error = action.payload.success ? "" : action.payload.message;
				state.message = action.payload.message;
			},
		);
		builder.addCase(getAllOrdersForAdmin.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// update order status -- admin <"Processing" | "Shipped" | "Delivered">
		builder.addCase(updateOrderStatus.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(
			updateOrderStatus.fulfilled,
			(state, action: PayloadAction<IOrderAction>) => {
				state.order = action.payload.order;
				state.loading = false;
				state.error = action.payload.success ? "" : action.payload.message;
				state.message = action.payload.message;
			},
		);
		builder.addCase(updateOrderStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// delete one order -- admin route
		builder.addCase(deleteOrderAdmin.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(
			deleteOrderAdmin.fulfilled,
			(state, action: PayloadAction<IGetMyOrders>) => {
				state.loading = false;
				state.error = action.payload.success ? "" : action.payload.message;
				state.message = action.payload.message;
			},
		);
		builder.addCase(deleteOrderAdmin.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
	},
});

export default orderSlice.reducer;
export {
	createOrder,
	getMyOrders,
	getOneOrder,
	getAllOrdersForAdmin,
	deleteOrderAdmin,
	getOneOrderForAdmin,
	updateOrderStatus,
};
