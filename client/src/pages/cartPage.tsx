import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartItems } from "../components";
import { getAllCartItems, useAppDispatch, useAppSelector } from "../store";

const Cart = () => {
	const dispatch = useAppDispatch();
	const { cart } = useAppSelector(state => state.cart);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllCartItems());
	}, [dispatch]);

	return (
		<section className="px-4 sm:px-8 py-12 fill_screen">
			<div className="center_screen relative">
				<h1 className="mb-12">Shopping cart</h1>
				{cart?.items?.length ? (
					<div>
						<section className="border-b-2 border-b-gray-600 pb-8">
							<h2>
								Subtotal : ₹{" "}
								{cart?.items
									.reduce(
										(acc, item) => acc + item.product.price * item.quantity,
										0,
									)
									.toFixed(2)}
							</h2>
							<button
								className="primary_button mt-6"
								onClick={() => navigate("/shipping")}
							>
								Check out
							</button>
						</section>
						<section>
							{cart?.items?.map((cartItem, idx) => (
								<CartItems key={idx} item={cartItem} />
							))}
						</section>
					</div>
				) : (
					<h2 className="text-center mt-10">Your shopping cart is empty</h2>
				)}
			</div>
		</section>
	);
};

export default Cart;
