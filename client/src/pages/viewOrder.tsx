import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GiBoxUnpacking } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { FcProcess } from "react-icons/fc";
import { getOneOrder, useAppDispatch, useAppSelector } from "../store";
import { ProductItems } from "../components";

const ViewOrder = () => {
	const dispatch = useAppDispatch();
	const { order } = useAppSelector(state => state.order);
	const { pathname } = useLocation();
	const path = pathname.substring(pathname.lastIndexOf("/") + 1);

	useEffect(() => {
		dispatch(getOneOrder(path));
	}, [dispatch, path]);

	return (
		<section className="px-4 sm:px-8 py-16 fill_screen">
			<div className="center_screen">
				<h1 className="text-lg sm:text-4xl">Order : # {order?._id}</h1>
				<div className="flex flex-col items-center justify-center gap-4 my-8">
					{order?.orderStatus === "Processing" ? (
						<FcProcess size={130} color="#ffffff" />
					) : order?.orderStatus === "Shipped" ? (
						<GoPackage size={130} color="#ffffff" />
					) : order?.orderStatus === "Delivered" ? (
						<GiBoxUnpacking size={130} color="#ffffff" />
					) : (
						<></>
					)}
					<h2>{order?.orderStatus}</h2>
				</div>
				<div className="mb-8">
					<h2 className="mb-4">Shipping Info</h2>
					<p className="my-1">
						<strong>Name</strong> : {order?.user?.name}
					</p>
					<p className="my-1">
						<strong>Phone</strong> : {order?.shippingInfo?.phoneNumber}
					</p>
					<p className="my-1">
						<strong>Address</strong> : {order?.shippingInfo?.address},{" "}
						{order?.shippingInfo?.city}, {order?.shippingInfo?.state},{" "}
						{order?.shippingInfo?.country}
					</p>
				</div>
				<div className="mb-8">
					<h2 className="mb-4">Payment</h2>
					<p className="my-1">
						<strong>Status</strong> :{" "}
						<span
							className={
								order?.paymentInfo?.status === "succeeded"
									? "text-green-500"
									: "text-red-500"
							}
						>
							{order?.paymentInfo?.status}
						</span>
					</p>
					<p className="my-1">
						<strong>Shipping Price</strong> : ₹ {order?.shippingPrice?.toFixed(2)}
					</p>
					<p className="my-1">
						<strong>Amount</strong> : ₹ {order?.totalPrice}
					</p>
				</div>
				<div className="mb-8">
					<h2 className="mb-4">Order Items</h2>
					<section>
						{order?.orderItems?.map((item, idx) => (
							<ProductItems
								key={idx}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								image={item.product.images[0].pic}
							/>
						))}
					</section>
				</div>
			</div>
		</section>
	);
};

export default ViewOrder;
