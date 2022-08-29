import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const OrderConfirmationPage = () => {
	const navigate = useNavigate();

	return (
		<section className="center_screen">
			<div className="fill_screen px-4 sm:px-8 py-12 flex flex-col items-center justify-center">
				<BsCheckCircleFill size={180} color="#4dee4d" className="mx-auto" />
				<h1 className="text-center my-8">Order Confirmed Successfully</h1>
				<button
					className="primary_button mt-4"
					onClick={() => navigate("/all-products", { replace: true })}
				>
					See more products
				</button>
			</div>
		</section>
	);
};

export default OrderConfirmationPage;
