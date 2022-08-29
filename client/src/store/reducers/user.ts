import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types";
import {
	getUser,
	deleteUser,
	updateUser,
	userLogin,
	userLogout,
	userSignup,
	forgotPassword,
	resetPassword,
} from "../requests/userRequest";

const initialState = {
	loading: false,
	user: {} as IUser,
	isAuth: false,
	error: "",
	message: "",
};

interface ActionType {
	success: boolean;
	user: IUser;
	message: string;
}

const getUserSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: builder => {
		// get user
		builder.addCase(getUser.pending, state => {
			state.loading = true;
			state.user = {} as IUser;
			state.error = "";
			state.isAuth = false;
			state.message = "";
		});
		builder.addCase(getUser.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.user = action.payload.user;
			state.error = "";
			state.isAuth = action.payload.user ? true : false;
			state.message = action.payload.message;
		});
		builder.addCase(getUser.rejected, (state, action) => {
			state.loading = false;
			state.user = {} as IUser;
			state.error = action.error.message || "Something went wrong";
			state.isAuth = false;
			state.message = action.error.message || "";
		});
		// user logout
		builder.addCase(userLogout.pending, state => {
			state.loading = true;
			state.error = "";
			state.isAuth = true;
			state.message = "";
		});
		builder.addCase(userLogout.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.user = {} as IUser;
			state.error = "";
			state.isAuth = !action.payload.success;
			state.message = action.payload.message;
		});
		builder.addCase(userLogout.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.isAuth = true;
			state.message = action.error.message || "";
		});
		// user login
		builder.addCase(userLogin.pending, state => {
			state.loading = true;
			state.user = {} as IUser;
			state.error = "";
			state.isAuth = false;
			state.message = "";
		});
		builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.user = action.payload.user;
			state.error = state.user ? "" : action.payload.message;
			state.isAuth = action.payload.user ? true : false;
			state.message = action.payload.message;
		});
		builder.addCase(userLogin.rejected, (state, action) => {
			state.loading = false;
			state.user = {} as IUser;
			state.error = action.error.message || "Something went wrong";
			state.isAuth = false;
			state.message = action.error.message || "";
		});
		// user signup
		builder.addCase(userSignup.pending, state => {
			state.loading = true;
			state.user = {} as IUser;
			state.error = "";
			state.isAuth = false;
			state.message = "";
		});
		builder.addCase(userSignup.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.user = action.payload.user;
			state.error = state.user ? "" : action.payload.message;
			state.isAuth = action.payload.user ? true : false;
			state.message = action.payload.message;
		});
		builder.addCase(userSignup.rejected, (state, action) => {
			state.loading = false;
			state.user = {} as IUser;
			state.error = action.error.message || "Something went wrong";
			state.isAuth = false;
			state.message = action.error.message || "";
		});
		// update user
		builder.addCase(updateUser.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.user = action.payload.user;
			state.error = state.user ? "" : action.payload.message;
			state.isAuth = true;
			state.message = action.payload.message;
		});
		builder.addCase(updateUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// forgot password
		builder.addCase(forgotPassword.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(forgotPassword.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.error = "";
			state.message = action.payload.message;
		});
		builder.addCase(forgotPassword.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// reset password
		builder.addCase(resetPassword.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(resetPassword.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.error = "";
			state.message = action.payload.message;
		});
		builder.addCase(resetPassword.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
		// delete user
		builder.addCase(deleteUser.pending, state => {
			state.loading = true;
			state.error = "";
			state.message = "";
		});
		builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<ActionType>) => {
			state.loading = false;
			state.user = {} as IUser;
			state.error = "";
			state.isAuth = false;
			state.message = action.payload.message;
		});
		builder.addCase(deleteUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || "Something went wrong";
			state.message = action.error.message || "";
		});
	},
});

export default getUserSlice.reducer;
export {
	getUser,
	userLogout,
	userLogin,
	userSignup,
	deleteUser,
	updateUser,
	forgotPassword,
	resetPassword,
};
