import { configureStore } from "@reduxjs/toolkit";
import allProductsReducer from "./reducers/fetchAllProducts";
import oneProductReducer from "./reducers/product";
import getUserReducer from "./reducers/user";
import cartReducer from "./reducers/cart";
import confirmOrderReducer from "./reducers/confirmOrder";
import orderReducer from "./reducers/order";
import reviewReducer from "./reducers/reviews";
import userAdminReducer from "./reducers/adminUser";

const store = configureStore({
	reducer: {
		allProducts: allProductsReducer,
		oneProduct: oneProductReducer,
		getUser: getUserReducer,
		cart: cartReducer,
		confirmOrder: confirmOrderReducer,
		order: orderReducer,
		review: reviewReducer,
		userAdmin: userAdminReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
