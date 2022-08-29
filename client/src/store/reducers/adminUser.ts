import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types";
import {
	deleteUserForAdmin,
	getAllUsersForAdmin,
	getOneUserForAdmin,
	updateUserRole,
} from "../requests/userRequest";

const initialState = {
	loading: false,
	user: {} as IUser,
	users: [] as IUser[],
	error: "",
	message: "",
};

interface ActionType {
	success: boolean;
	user: IUser;
	users: IUser[];
	message: string;
}

const getUserSlice = createSlice({
	name: "userAdmin",
	initialState,
	reducers: {},
	extraReducers: builder => {
		// get all users -- admin
		builder.addCase(getAllUsersForAdmin.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(
			getAllUsersForAdmin.fulfilled,
			(state, action: PayloadAction<ActionType>) => {
				state.loading = false;
				state.users = action.payload.users;
				state.error = state.users ? "" : action.payload.message;
				state.message = action.payload.message;
			},
		);
		builder.addCase(getAllUsersForAdmin.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// get one user -- admin
		builder.addCase(getOneUserForAdmin.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(
			getOneUserForAdmin.fulfilled,
			(state, action: PayloadAction<ActionType>) => {
				state.loading = false;
				state.user = action.payload.user;
				state.error = state.user ? "" : action.payload.message;
				state.message = action.payload.message;
			},
		);
		builder.addCase(getOneUserForAdmin.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// update user role -- admin
		builder.addCase(updateUserRole.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(updateUserRole.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.user = action.payload.user;
			state.error = state.user ? "" : action.payload.message;
			state.message = action.payload.message;
		});
		builder.addCase(updateUserRole.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// delete user -- admin
		builder.addCase(deleteUserForAdmin.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(
			deleteUserForAdmin.fulfilled,
			(state, action: PayloadAction<ActionType>) => {
				state.loading = false;
				state.user = {} as IUser;
				state.error = "";
				state.message = action.payload.message;
			},
		);
		builder.addCase(deleteUserForAdmin.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
	},
});

export default getUserSlice.reducer;
export { getAllUsersForAdmin, getOneUserForAdmin, deleteUserForAdmin, updateUserRole };
