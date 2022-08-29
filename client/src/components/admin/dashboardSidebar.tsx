import { Dispatch, SetStateAction, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { Link } from "react-router-dom";

interface DashboardSidebarProps {
	setToggleSidebar: Dispatch<SetStateAction<boolean>>;
	toggleSidebar: boolean;
}

const DashboardSidebar = ({ toggleSidebar, setToggleSidebar }: DashboardSidebarProps) => {
	const [toggleProductLinks, setToggleProductLinks] = useState<boolean>(false);

	const closeTogglebar = () => {
		setToggleSidebar(prev => false);
	};

	return (
		<>
			{/* For mobile sidebar */}
			<aside
				className={`bg-black z-[1] fixed inset-0 right-auto pt-16 px-10 min-w-[17em] lg:hidden transition-all duration-300 origin-left ${
					toggleSidebar ? "scale-x-100 opacity-1" : "scale-x-0 opacity-0"
				}`}
			>
				<ImCancelCircle
					size={25}
					className="cursor-pointer mb-6"
					onClick={() => setToggleSidebar(prev => false)}
				/>
				<h1 className="mb-8">PACIFIO</h1>
				<div className="flex flex-col gap-4 justify-center">
					<Link to="/admin/dashboard" onClick={closeTogglebar}>
						Dashboard
					</Link>
					<div
						onClick={() => setToggleProductLinks(prev => !prev)}
						className="flex gap-4 items-center cursor-pointer"
					>
						<span>Products</span>
						<MdOutlineArrowForwardIos
							size={15}
							className={`transition-transform duration-300 ${
								toggleProductLinks ? "rotate-90" : ""
							}`}
						/>
					</div>
					{toggleProductLinks ? (
						<div className="flex flex-col gap-2 justify-center pl-8">
							<Link to="/admin/all-products" onClick={closeTogglebar}>
								All
							</Link>
							<Link to="/admin/create-product" onClick={closeTogglebar}>
								Create
							</Link>
							<Link to="/admin/out-of-stock-products" onClick={closeTogglebar}>
								Out Of Stock
							</Link>
						</div>
					) : (
						<></>
					)}
					<Link to="/admin/all-orders" onClick={closeTogglebar}>
						Orders
					</Link>
					<Link to="/admin/all-users" onClick={closeTogglebar}>
						Users
					</Link>
					<Link to="/admin/all-reviews" onClick={closeTogglebar}>
						Reviews
					</Link>
				</div>
			</aside>
			{/* for desktop sidebar */}
			<aside className="bg-slate-700 fill_screen pt-16 px-10 min-w-[17em] hidden lg:flex flex-col">
				<h1 className="mb-8">PACIFIO</h1>
				<div className="flex flex-col gap-4 justify-center">
					<Link to="/admin/dashboard">Dashboard</Link>
					<div
						onClick={() => setToggleProductLinks(prev => !prev)}
						className="flex gap-4 items-center cursor-pointer"
					>
						<span>Products</span>
						<MdOutlineArrowForwardIos
							size={15}
							className={`transition-transform duration-300 ${
								toggleProductLinks ? "rotate-90" : ""
							}`}
						/>
					</div>
					{toggleProductLinks ? (
						<div className="flex flex-col gap-2 justify-center pl-8">
							<Link to="/admin/all-products">All</Link>
							<Link to="/admin/create-product">Create</Link>
							<Link to="/admin/out-of-stock-products">Out Of Stock</Link>
						</div>
					) : (
						<></>
					)}
					<Link to="/admin/all-orders">Orders</Link>
					<Link to="/admin/all-users">Users</Link>
					<Link to="/admin/all-reviews">Reviews</Link>
				</div>
			</aside>
		</>
	);
};

export default DashboardSidebar;
