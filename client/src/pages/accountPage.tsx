import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, deleteUser, userLogout } from "../store";
import userImage from "../assets/images/user.jfif";

const AccountPage: FC = () => {
	const { user } = useAppSelector(state => state.getUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		const verifyLogout = window.confirm("Are you sure you want to logout");
		if (!verifyLogout) return;
		dispatch(userLogout());
		navigate("/login");
	};

	const handleDeleteAccount = () => {
		const verifyDeleteAccount = window.confirm("Are you sure you want to delete your account");
		if (!verifyDeleteAccount) return;
		dispatch(deleteUser());
		navigate("/signup");
	};

	return (
		<section className="px-4 sm:px-8 py-16">
			<div className="center_screen">
				<h1 className="text-center">Your Account</h1>
				<div className="my-10 mx-auto flex items-center justify-center">
					{user?.pic ? (
						<img
							src={user?.pic}
							alt={user?.name}
							className="w-60 h-60 rounded-full"
							loading="lazy"
						/>
					) : (
						<img
							src={userImage}
							alt={user?.name}
							className="w-60 h-60 rounded-full"
							loading="lazy"
						/>
					)}
				</div>
				<h1 className="text-center mb-4">{user?.name}</h1>
				<h2 className="text-center mb-12 text-lg vxs:text-xl sm:text-2xl">{user?.email}</h2>
				{user?.role === "admin" && (
					<Link
						to="/admin/dashboard"
						className="primary_button mx-auto my-6 w-48 flex items-center justify-center"
					>
						Admin Dashboard
					</Link>
				)}
				<Link
					to="/my-orders"
					className="primary_button mx-auto my-6 w-48 flex items-center justify-center"
				>
					Your Orders
				</Link>
				<Link
					to="/account/update"
					className="secondary_button mx-auto my-6 w-48 flex items-center justify-center"
				>
					Update Profile
				</Link>
				<button
					type="submit"
					className="secondary_danger_button mx-auto my-6 w-48 flex items-center justify-center"
					onClick={handleLogout}
				>
					Logout
				</button>
				<button
					type="submit"
					className="primary_danger_button mx-auto my-6 w-48 flex items-center justify-center"
					onClick={handleDeleteAccount}
				>
					Delete Account
				</button>
			</div>
		</section>
	);
};

export default AccountPage;
