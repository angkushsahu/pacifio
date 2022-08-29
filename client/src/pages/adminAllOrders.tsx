import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Parent } from "../components";
import { useAppDispatch, useAppSelector, getAllOrdersForAdmin } from "../store";

const AdminAllOrders = () => {
	const dispatch = useAppDispatch();
	const { allOrders } = useAppSelector(state => state.order);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllOrdersForAdmin());
		console.log(__filename);
	}, [dispatch]);

	return (
		<Parent>
			<h1 className="text-center">All Orders</h1>
			<div className="w-full overflow-x-auto">
				{allOrders?.length ? (
					<table className="w-full mx-auto text-left text-base sm:text-lg mt-8">
						<thead className="hidden md:table-header-group">
							<tr>
								<th>Order ID</th>
								<th>Status</th>
								<th>Item Quantity</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							{allOrders?.map((order, idx) => (
								<tr
									key={order._id}
									className="bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black md:shadow-none px-4 pb-4 md:from-transparent md:to-transparent flex flex-col gap-4 my-8 md:table-row cursor-pointer border-spacing-4 border-collapse border-t-transparent border-t-[1em]"
								>
									<td onClick={() => navigate(`/admin/order/${order._id}`)}>
										{order._id}
									</td>
									<td onClick={() => navigate(`/admin/order/${order._id}`)}>
										<strong className="md:hidden">Status :</strong>{" "}
										{order.orderStatus}
									</td>
									<td onClick={() => navigate(`/admin/order/${order._id}`)}>
										<strong className="md:hidden">Item Quantity :</strong>{" "}
										{order.orderItems.length}
									</td>
									<td onClick={() => navigate(`/admin/order/${order._id}`)}>
										<strong className="md:hidden">Amount :</strong> ₹{" "}
										{order.totalPrice?.toFixed(2)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<h2 className="text-center mt-8">No orders to display</h2>
				)}
			</div>
		</Parent>
	);
};

export default AdminAllOrders;
