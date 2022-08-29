import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import {
	deleteAllItemsFromCart,
	useAppDispatch,
	API_URL,
	useAppSelector,
	createOrder,
} from "../store";
import { ProgressBar } from "../components";
import { toastOptions } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
	const [disableButton, setDisableButton] = useState<boolean>(false);
	const navigate = useNavigate();
	const { shippingDetails, subTotal } = useAppSelector(state => state.confirmOrder);
	const { user } = useAppSelector(state => state.getUser);
	const { cart } = useAppSelector(state => state.cart);
	const dispatch = useAppDispatch();
	const stripe = useStripe();
	const elements = useElements();

	const orderItems: { name: string; quantity: number; price: number; product: string }[] = [];
	// eslint-disable-next-line
	cart?.items?.map(item => {
		orderItems.push({
			name: item.product.name,
			quantity: item.quantity,
			price: item.product.price,
			product: item.product._id,
		});
	});

	const newOrder = {
		shippingInfo: shippingDetails,
		orderItems,
		paymentInfo: { id: "", status: "" },
		itemsPrice: subTotal,
		shippingPrice: 50,
		totalPrice: subTotal + 50,
	};

	useEffect(() => {
		if (!subTotal && !sessionStorage.getItem("totalAmount")) {
			toast.error("Please confirm your order", toastOptions);
			navigate("/shipping");
		}
		// eslint-disable-next-line
	}, [navigate]);

	const paymentHandler = async (e: FormEvent) => {
		e.preventDefault();
		setDisableButton(prev => true);

		try {
			const response = await fetch(`${API_URL}/payment/process`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ amount: Math.round(subTotal * 100) }),
			});
			const data = await response.json();
			if (!data.success) {
				toast.error("Unable to process payment", toastOptions);
				return;
			}
			const clientSecret = data.clientSecret;
			if (!stripe || !elements) {
				return;
			}

			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardNumberElement)!,
					billing_details: {
						name: user?.name || "",
						email: user?.email || "",
						address: {
							line1: shippingDetails.address,
							city: shippingDetails.city,
							state: shippingDetails.state,
							postal_code: shippingDetails.pincode,
							country: shippingDetails.country,
						},
					},
				},
			});
			if (result.error) {
				toast.error(result.error.message, toastOptions);
			} else {
				if (result.paymentIntent.status === "succeeded") {
					newOrder.paymentInfo.id = result.paymentIntent.id;
					newOrder.paymentInfo.status = result.paymentIntent.status;
					dispatch(createOrder(newOrder));
					dispatch(deleteAllItemsFromCart());
					navigate("/order-confirmed", { replace: true });
				} else {
					toast.error("Some error occurred while processing your payment", toastOptions);
				}
			}
			setDisableButton(prev => false);
		} catch (error: any) {
			setDisableButton(prev => false);
			toast.error(error.message || "Internal Server Error", toastOptions);
		}
	};

	const options = {
		style: {
			base: { color: "#ffffff" },
			invalid: { color: "#ff5a5a" },
		},
	};
	return (
		<section className="center_screen">
			<div className="fill_screen px-4 sm:px-8 py-12">
				<ProgressBar />
				<div className="mt-6 max-w-[37.5em] w-full mx-auto px-4 sm:px-8 py-6 rounded-md bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black">
					<h1 className="mb-8">Payment</h1>
					<form onSubmit={paymentHandler}>
						<div className="input_container">
							<label htmlFor="cardNumber">Enter your card number</label>
							<CardNumberElement options={options} />
						</div>
						<div className="input_container">
							<label htmlFor="expiry">Enter your card expiry date</label>
							<CardExpiryElement options={options} />
						</div>
						<div className="input_container">
							<label htmlFor="cvv">Enter your card CVV</label>
							<CardCvcElement options={options} />
						</div>
						<button
							type="submit"
							className="primary_button ml-auto mt-6 block"
							disabled={disableButton}
						>
							Pay ₹ {subTotal.toFixed(2)}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default PaymentPage;
