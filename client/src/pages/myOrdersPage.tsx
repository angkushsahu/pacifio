import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GiBoxUnpacking } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { FcProcess } from "react-icons/fc";
import { getMyOrders, useAppDispatch, useAppSelector } from "../store";

const MyOrdersPage = () => {
	const dispatch = useAppDispatch();
	const { allOrders } = useAppSelector(state => state.order);

	useEffect(() => {
		dispatch(getMyOrders());
	}, [dispatch]);

	return (
		<section className="px-4 sm:px-8 py-12 fill_screen">
			<div className="center_screen">
				{allOrders?.length ? (
					allOrders?.map((order, idx) => (
						<article
							key={idx}
							className="px-4 sm:px-8 py-10 rounded-md bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black mb-16"
						>
							<div className="flex items-center justify-between">
								<div>
									<p className="description my-4">
										<strong>Order ID</strong> : {order._id}
									</p>
									<p className="description my-4 sm:hidden">
										<strong>Current Status</strong> : {order.orderStatus}
									</p>
									<p className="description my-4">
										<strong>Items purchased</strong> : {order.orderItems.length}
									</p>
									<p className="description my-4 mb-10">
										<strong>Amount</strong> : {order.totalPrice}
									</p>
								</div>
								<div className="hidden sm:flex flex-col items-center justify-center gap-4 mb-10">
									{order.orderStatus === "Processing" ? (
										<FcProcess size={130} color="#ffffff" />
									) : order.orderStatus === "Shipped" ? (
										<GoPackage size={130} color="#ffffff" />
									) : order.orderStatus === "Delivered" ? (
										<GiBoxUnpacking size={130} color="#ffffff" />
									) : (
										<></>
									)}
									<h2>{order.orderStatus}</h2>
								</div>
							</div>
							<Link
								to={`/my-order/${order._id}`}
								className="primary_button max-w-md mx-auto block text-center"
							>
								View Order
							</Link>
						</article>
					))
				) : (
					<h2 className="text-center">You have no orders currently</h2>
				)}
			</div>
		</section>
	);
};

export default MyOrdersPage;
