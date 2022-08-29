import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addSubtotal, useAppDispatch, useAppSelector } from "../store";
import { ProductItems, ProgressBar } from "../components";
import { toastOptions } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const ConfirmOrderPage = () => {
	const { user } = useAppSelector(state => state.getUser);
	const { cart } = useAppSelector(state => state.cart);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (
			!sessionStorage.getItem("address") ||
			!sessionStorage.getItem("city") ||
			!sessionStorage.getItem("pincode") ||
			!sessionStorage.getItem("phoneNumber") ||
			!sessionStorage.getItem("country") ||
			!sessionStorage.getItem("state")
		) {
			toast.error("Please validate shipping details", toastOptions);
			navigate("/shipping", { replace: true });
		}
	}, [navigate]);

	const totalPrice = cart?.items
		.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
		.toFixed(2);
	const shippingCharge = 50;

	const subTotal = Number(totalPrice) + shippingCharge;

	const confirmOrder = () => {
		sessionStorage.setItem("totalAmount", `${subTotal}`);
		dispatch(addSubtotal(subTotal));
		navigate("/payment");
	};

	return (
		<section className="center_screen">
			<div className="fill_screen px-4 sm:px-8 py-12">
				<ProgressBar />
				<div className="flex flex-col lg:flex-row items-center justify-center py-10">
					<section className="flex-1 flex gap-8 flex-col justify-center lg:border-r-2 lg:border-r-gray-600 lg:pr-6 w-full">
						<section>
							<h2 className="mb-4 text-center lg:text-left">Shipping Details</h2>
							<p className="description text-center lg:text-left my-2">
								<strong>Name : </strong>
								{user?.name}
							</p>
							<p className="description text-center lg:text-left my-2">
								<strong>Phone : </strong> {sessionStorage.getItem("phoneNumber")}
							</p>
							<p className="description text-center lg:text-left my-2">
								<strong>Address : </strong> {sessionStorage.getItem("address")},{" "}
								{sessionStorage.getItem("city")}, {sessionStorage.getItem("state")},{" "}
								{sessionStorage.getItem("country")}
							</p>
							<p className="description text-center lg:text-left my-2">
								<strong>Pin : </strong> {sessionStorage.getItem("pincode")}
							</p>
						</section>
						<section>
							<h2 className="mb-4 text-center lg:text-left">Your cart items</h2>
							{cart?.items?.map((item, idx) => (
								<ProductItems
									key={idx}
									name={item.product.name}
									price={item.product.price}
									quantity={item.quantity}
									image={item.product.images[0].pic}
								/>
							))}
						</section>
					</section>
					<section className="lg:pl-8 sm:min-w-[20em] -order-1 lg:order-1">
						<h1 className="mb-8 text-center lg:text-left">Order Summary</h1>
						<p className="description flex items-center justify-between">
							<strong>Subtotal</strong> ₹ {totalPrice}
						</p>
						<p className="description flex items-center justify-between border-b-2 border-b-gray-600 pb-4 mt-2">
							<strong>Shipping</strong> ₹ {shippingCharge.toFixed(2)}
						</p>
						<h2 className="pt-6 flex items-center justify-between w-full">
							<span>Total</span> ₹ {subTotal.toFixed(2)}
						</h2>
						<button
							className="primary_button block my-12 lg:my-8 mx-auto lg:mx-0 lg:ml-auto"
							onClick={confirmOrder}
						>
							Confirm Order
						</button>
					</section>
				</div>
			</div>
		</section>
	);
};

export default ConfirmOrderPage;
