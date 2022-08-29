import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillCartFill, BsSearch, BsList } from "react-icons/bs";
import {
	userLogout,
	useAppDispatch,
	useAppSelector,
	getUser,
	getAllCartItems,
} from "../../../store";
import MobileNav from "./mobileNav";
import SearchBar from "./searchBar";
import logo from "../../../assets/images/logo.png";

const Navbar = () => {
	const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);
	const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isAuth, user } = useAppSelector(state => state.getUser);
	const { cart } = useAppSelector(state => state.cart);

	const handleLogout = () => {
		const verifyLogout = window.confirm("Are you sure you want to logout");
		if (!verifyLogout) return;
		dispatch(userLogout());
	};

	useEffect(() => {
		dispatch(getUser());
		dispatch(getAllCartItems());
	}, [dispatch]);

	const ShowAuthNavigation = () => (
		<>
			<Link
				to="/account"
				className={pathname === "/account" ? "text-blue-400" : "text-white"}
			>
				Account
			</Link>
			{user?.role === "admin" && (
				<Link
					to="/admin/dashboard"
					className={pathname === "/admin/dashboard" ? "text-blue-400" : "text-white"}
				>
					Dashboard
				</Link>
			)}
			<span className="cursor-pointer" onClick={handleLogout}>
				Logout
			</span>
		</>
	);

	const ShowUnAuthNavigation = () => (
		<>
			<Link to="/login" className={pathname === "/login" ? "text-blue-400" : "text-white"}>
				Login
			</Link>
			<Link to="/signup" className={pathname === "/signup" ? "text-blue-400" : "text-white"}>
				Signup
			</Link>
		</>
	);

	return (
		<>
			<header className="bg-black px-4 sm:px-8">
				<div className="flex items-center justify-between center_screen py-4">
					<div className="flex gap-10">
						<img
							src={logo}
							alt="logo"
							className="w-8 cursor-pointer"
							onClick={() => navigate("/")}
							loading="lazy"
						/>
						<nav className="hidden md:flex gap-6 items-center justify-center text-sm">
							<Link
								to="/"
								className={pathname === "/" ? "text-blue-400" : "text-white"}
							>
								Home
							</Link>
							<Link
								to="/all-products"
								className={
									pathname === "/all-products" ? "text-blue-400" : "text-white"
								}
							>
								Products
							</Link>
							{isAuth && <ShowAuthNavigation />}
							{!isAuth && <ShowUnAuthNavigation />}
						</nav>
					</div>
					<div className="flex gap-6 items-center justify-center">
						<BsSearch
							size={18}
							color="#ffffff"
							className="cursor-pointer"
							onClick={() => setShowSearchBar(prev => !prev)}
						/>
						{isAuth && (
							<div className="relative" onClick={() => navigate("/cart")}>
								<BsFillCartFill
									size={20}
									color="#ffffff"
									className="cursor-pointer"
								/>
								{cart.items.length ? (
									<span className="bg-red-500 absolute -top-3 -right-3 text-xs rounded-full p-[4px] scale-90 cursor-pointer">
										{cart.items.length}
									</span>
								) : (
									<></>
								)}
							</div>
						)}
						<BsList
							size={20}
							color="#ffffff"
							className="cursor-pointer md:hidden"
							onClick={() => setToggleSideBar(prev => true)}
						/>
					</div>
				</div>
			</header>
			{showSearchBar && <SearchBar setShowSearchBar={setShowSearchBar} />}
			<MobileNav
				toggleSideBar={toggleSideBar}
				setToggleSideBar={setToggleSideBar}
				isAuth={isAuth}
				handleLogout={handleLogout}
				role={user?.role || ""}
			/>
		</>
	);
};

export default Navbar;
