import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Parent } from "../components";
import {
	deleteUserForAdmin,
	getOneUserForAdmin,
	updateUserRole,
	useAppDispatch,
	useAppSelector,
} from "../store";
import userImage from "../assets/images/user.jfif";

const AdminViewUser = () => {
	const [role, setRole] = useState<string>("");
	const { pathname } = useLocation();
	const path = pathname.substring(pathname.lastIndexOf("/") + 1);
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.userAdmin);
	const data = useAppSelector(state => state.getUser);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getOneUserForAdmin(path));
	}, [dispatch, path]);

	const deleteUserFunctionality = (id: string) => {
		const confirmation = window.confirm("Are you sure you want to delete this product");
		if (!confirmation) {
			return;
		}
		dispatch(deleteUserForAdmin(id));
		navigate("/admin/all-users");
	};

	const updateUserRoleFunctionality = (e: FormEvent) => {
		e.preventDefault();
		dispatch(updateUserRole({ id: user?._id, role }));
	};

	const setUserRole = (e: ChangeEvent<HTMLSelectElement>) => {
		setRole(e.target.value);
	};

	return (
		<Parent>
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
			<h2 className="text-center mb-4">Role : {user?.role}</h2>
			<h2 className="text-center mb-12 text-lg vxs:text-xl sm:text-2xl">
				Email : {user?.email}
			</h2>
			{data?.user?._id === user?._id ? (
				<></>
			) : (
				<form onSubmit={updateUserRoleFunctionality}>
					<div className="input_container">
						<select name="role" id="role" value={role} onChange={setUserRole}>
							{["admin", "user"].map((value, idx) => (
								<option key={idx} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
					<button
						type="submit"
						className="primary_button mx-auto block max-w-sm w-full my-8"
					>
						Update Role
					</button>
				</form>
			)}
			<button
				className="primary_danger_button ml-auto block mt-4"
				onClick={() => deleteUserFunctionality(user?._id || "")}
			>
				Delete this account
			</button>
		</Parent>
	);
};

export default AdminViewUser;
