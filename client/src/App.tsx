import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import { Footer, Loading, Header, ProtectedRoute, OnlyForAdmin } from "./components";
import { API_URL } from "./store";
const HomePage = lazy(() => import("./pages/homePage"));
const Product = lazy(() => import("./pages/product"));
const AllProducts = lazy(() => import("./pages/allProducts"));
const AccountPage = lazy(() => import("./pages/accountPage"));
const UpdateAccountPage = lazy(() => import("./pages/updateAccountPage"));
const LoginPage = lazy(() => import("./pages/loginPage"));
const SignupPage = lazy(() => import("./pages/signupPage"));
const ForgotPasswordPage = lazy(() => import("./pages/forgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/resetPasswordPage"));
const CartPage = lazy(() => import("./pages/cartPage"));
const ShippingPage = lazy(() => import("./pages/shippingPage"));
const ConfirmOrderPage = lazy(() => import("./pages/confirmOrderPage"));
const PaymentPage = lazy(() => import("./pages/paymentPage"));
const OrderConfirmationPage = lazy(() => import("./pages/orderConfirmationPage"));
const MyOrdersPage = lazy(() => import("./pages/myOrdersPage"));
const ViewOrder = lazy(() => import("./pages/viewOrder"));
const ErrorPage = lazy(() => import("./pages/errorPage"));
// admin routes
const AdminDashboard = lazy(() => import("./pages/adminDashboard"));
const AdminAllProducts = lazy(() => import("./pages/adminAllProducts"));
const AdminNewProduct = lazy(() => import("./pages/adminNewProduct"));
const AdminAllOrders = lazy(() => import("./pages/adminAllOrders"));
const AdminViewOrder = lazy(() => import("./pages/adminViewOrder"));
const AdminAllUsers = lazy(() => import("./pages/adminAllUsers"));
const AdminViewUser = lazy(() => import("./pages/adminViewUser"));
const AdminAllReviews = lazy(() => import("./pages/adminAllReviews"));
const AdminViewReview = lazy(() => import("./pages/adminViewReview"));
const AdminUpdateProduct = lazy(() => import("./pages/adminUpdateProduct"));
const AdminOutOfStock = lazy(() => import("./pages/adminOutOfStock"));

function App() {
	const [key, setKey] = useState<string>("");

	const getStripeKey = async () => {
		const response = await fetch(`${API_URL}/payment/get-key`, {
			method: "GET",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();

		setKey(prev => data.stripeApiKey);
	};

	useEffect(() => {
		getStripeKey();
	}, [key]);

	return (
		<main className="root min-h-screen">
			<BrowserRouter>
				<Header />
				<Suspense fallback={<Loading />}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/all-products" element={<AllProducts />} />
						<Route path="/product/:id" element={<Product />} />
						<Route
							path="/account"
							element={
								<ProtectedRoute>
									<AccountPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/account/update"
							element={
								<ProtectedRoute>
									<UpdateAccountPage />
								</ProtectedRoute>
							}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/forgot-password" element={<ForgotPasswordPage />} />
						<Route path="/reset-password/:id" element={<ResetPasswordPage />} />
						<Route
							path="/cart"
							element={
								<ProtectedRoute>
									<CartPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/shipping"
							element={
								<ProtectedRoute>
									<ShippingPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/confirm-order"
							element={
								<ProtectedRoute>
									<ConfirmOrderPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/payment"
							element={
								<ProtectedRoute>
									<>
										{key && (
											<Elements stripe={loadStripe(key)}>
												<PaymentPage />
											</Elements>
										)}
									</>
								</ProtectedRoute>
							}
						/>
						<Route path="/order-confirmed" element={<OrderConfirmationPage />} />
						<Route
							path="/my-orders"
							element={
								<ProtectedRoute>
									<MyOrdersPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/my-order/:id"
							element={
								<ProtectedRoute>
									<ViewOrder />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/dashboard"
							element={
								<OnlyForAdmin>
									<AdminDashboard />
								</OnlyForAdmin>
							}
						/>
						<Route
							path="/admin/all-products"
							element={
								<OnlyForAdmin>
									<AdminAllProducts />
								</OnlyForAdmin>
							}
						/>
						<Route
							path="/admin/create-product"
							element={
								<OnlyForAdmin>
									<AdminNewProduct />
								</OnlyForAdmin>
							}
						/>
						<Route
							path="/admin/update-product/:id"
							element={
								<OnlyForAdmin>
									<AdminUpdateProduct />
								</OnlyForAdmin>
							}
						/>
						<Route
							path="/admin/out-of-stock-products"
							element={
								<OnlyForAdmin>
									<AdminOutOfStock />
								</OnlyForAdmin>
							}
						/>
						<Route
							path="/admin/all-orders"
							element={
								<OnlyForAdmin>
									<AdminAllOrders />
								</OnlyForAdmin>
							}
						/>
						<Route
							path="/admin/order/:id"
							element={
								<OnlyForAdmin>
									<AdminViewOrder />
								</OnlyForAdmin>
							}
						/>
						<Route
							path="/admin/all-users"
							element={
								<OnlyForAdmin>
									<AdminAllUsers />
								</OnlyForAdmin>
							}
						/>
						<Route
							path="/admin/user/:id"
							element={
								<OnlyForAdmin>
									<AdminViewUser />
								</OnlyForAdmin>
							}
						/>
						<Route
							path="/admin/all-reviews"
							element={
								<OnlyForAdmin>
									<AdminAllReviews />
								</OnlyForAdmin>
							}
						/>
						<Route
							path="/admin/review/:id"
							element={
								<OnlyForAdmin>
									<AdminViewReview />
								</OnlyForAdmin>
							}
						/>
						<Route path="/*" element={<ErrorPage />} />
					</Routes>
				</Suspense>
				<Footer />
			</BrowserRouter>
			<ToastContainer />
		</main>
	);
}

export default App;
