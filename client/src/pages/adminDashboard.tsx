import { Link } from "react-router-dom";
import {
	fetchAllProductsForAdmin,
	getAllOrdersForAdmin,
	getAllUsersForAdmin,
	useAppDispatch,
	useAppSelector,
	getAllOutOfStockProducts,
} from "../store";
import { Parent } from "../components";
import { useEffect } from "react";

const AdminDashboard = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.getUser);
	const { numberOfProducts, outOfStockProductsQuantity } = useAppSelector(
		state => state.allProducts,
	);
	const { allOrders, totalAmount } = useAppSelector(state => state.order);
	const { users } = useAppSelector(state => state.userAdmin);

	const details = [
		{ title: "Products", units: numberOfProducts, link: "/admin/all-products" },
		{ title: "Orders", units: allOrders?.length, link: "/admin/all-orders" },
		{ title: "Users", units: users?.length, link: "/admin/all-users" },
		{ title: "Reviews", units: numberOfProducts, link: "/admin/all-reviews" },
	];

	useEffect(() => {
		dispatch(fetchAllProductsForAdmin());
		dispatch(getAllOutOfStockProducts());
		dispatch(getAllOrdersForAdmin());
		dispatch(getAllUsersForAdmin());
	}, [dispatch]);

	return (
		<Parent>
			<div className="pt-4 pb-6 mb-10 border-b-[1px] border-b-gray-500">
				<h1 className="text-center mb-6">Dashboard</h1>
				<h2 className="mb-4">Hello, {user?.name} 👋🏻</h2>
				<p className="text-lg sm:text-xl">Welcome to Pacifio</p>
			</div>
			<div className="flex flex-col gap-4 items-center justify-center">
				<h1 className="text-center">Total Amount : ₹ {totalAmount?.toFixed(2)}</h1>
				<div className="flex flex-wrap gap-8 items-center justify-center my-8">
					{details.map(({ title, units, link }, idx) => (
						<Link
							to={link}
							key={idx}
							className="bg-blue-600 h-40 w-40 rounded-full flex flex-col items-center justify-center cursor-pointer"
						>
							<h2 className="text-center">{title}</h2>
							<h2 className="text-center">{units}</h2>
						</Link>
					))}
				</div>
				<Link
					to="/admin/out-of-stock-products"
					className="bg-red-600 h-48 w-48 rounded-full flex flex-col items-center justify-center mb-12 cursor-pointer"
				>
					<h2 className="text-center">Out Of Stock</h2>
					<h2 className="text-center">{outOfStockProductsQuantity}</h2>
				</Link>
			</div>
		</Parent>
	);
};

export default AdminDashboard;
