import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";

const MobileNav = ({
	toggleSideBar,
	setToggleSideBar,
	isAuth,
	handleLogout,
	role,
}: {
	toggleSideBar: boolean;
	setToggleSideBar: Dispatch<SetStateAction<boolean>>;
	isAuth: boolean;
	handleLogout: () => void;
	role: "user" | "admin";
}) => {
	return (
		<aside
			className={`md:hidden fixed z-50 top-0 bottom-0 right-0 bg-black shadow-xl shadow-gray-600 transition-all duration-300 origin-right ${
				toggleSideBar ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
			}`}
		>
			<nav className="w-72 px-6 py-8 flex flex-col gap-6 justify-center text-sm">
				<MdOutlineCancel
					size={30}
					color="#ffffff"
					className="cursor-pointer ml-auto"
					onClick={() => setToggleSideBar(prev => false)}
				/>
				<Link to="/" onClick={() => setToggleSideBar(prev => false)}>
					Home
				</Link>
				<Link to="/all-products" onClick={() => setToggleSideBar(prev => false)}>
					Products
				</Link>
				{isAuth ? (
					<>
						<Link to="/account" onClick={() => setToggleSideBar(prev => false)}>
							Account
						</Link>
						{role === "admin" && (
							<Link
								to="/admin/dashboard"
								onClick={() => setToggleSideBar(prev => false)}
							>
								Dashboard
							</Link>
						)}
						<span
							onClick={() => setToggleSideBar(prev => false)}
							className="cursor-pointer"
							onClickCapture={handleLogout}
						>
							Logout
						</span>
					</>
				) : (
					<>
						<Link to="/login" onClick={() => setToggleSideBar(prev => false)}>
							Login
						</Link>
						<Link to="/signup" onClick={() => setToggleSideBar(prev => false)}>
							Signup
						</Link>
					</>
				)}
			</nav>
		</aside>
	);
};

export default MobileNav;
