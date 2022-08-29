import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiBoxUnpacking } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { FcProcess } from "react-icons/fc";
import { Loading, Parent, ProductItems } from "../components";
import {
	deleteOrderAdmin,
	getOneOrderForAdmin,
	updateOrderStatus,
	useAppDispatch,
	useAppSelector,
} from "../store";

const AdminViewOrder = () => {
	const [process, setProcess] = useState<string>("Processing");
	const { pathname } = useLocation();
	const path = pathname.substring(pathname.lastIndexOf("/") + 1);
	const dispatch = useAppDispatch();
	const { order, loading } = useAppSelector(state => state.order);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getOneOrderForAdmin(path));
		console.log(__filename);
	}, [dispatch, path]);

	const changeProcess = (e: ChangeEvent<HTMLSelectElement>) => {
		setProcess(e.target.value);
		console.log(e.target.value);
	};

	const submitProcessUpdate = (e: FormEvent) => {
		e.preventDefault();
		dispatch(updateOrderStatus({ id: order?._id || "", status: process }));
	};

	const deleteOrderFunctionality = (id: string) => {
		const confirmation = window.confirm("Are you sure you want to delete this order");
		if (!confirmation) {
			return;
		}
		dispatch(deleteOrderAdmin(id));
		navigate("/admin/all-orders");
	};

	return (
		<Parent>
			{loading && !order ? (
				<Loading />
			) : (
				<>
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
					{order?.orderStatus === "Delivered" ? (
						<></>
					) : (
						<form onSubmit={submitProcessUpdate} className="my-8">
							<h2>Process Order</h2>
							<div className="input_container">
								<select
									name="process"
									id="process"
									value={process}
									onChange={changeProcess}
								>
									{["Processing", "Shipped", "Delivered"].map(
										(processStep, idx) => (
											<option key={idx} value={processStep}>
												{processStep}
											</option>
										),
									)}
								</select>
							</div>
							<button
								type="submit"
								className="primary_button mx-auto block max-w-sm w-full mt-8"
							>
								Update
							</button>
						</form>
					)}
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
									image={
										item.product?.images?.length
											? item?.product?.images[0].pic
											: ""
									}
								/>
							))}
						</section>
					</div>
					<button
						className="primary_danger_button ml-auto block mt-4"
						onClick={() => deleteOrderFunctionality(order?._id || "")}
					>
						Delete Order
					</button>
				</>
			)}
		</Parent>
	);
};

export default AdminViewOrder;
