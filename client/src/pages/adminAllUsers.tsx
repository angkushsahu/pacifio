import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Parent } from "../components";
import { getAllUsersForAdmin, useAppDispatch, useAppSelector } from "../store";

const AdminAllUsers = () => {
	const dispatch = useAppDispatch();
	const { users } = useAppSelector(state => state.userAdmin);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllUsersForAdmin());
	}, [dispatch]);

	return (
		<Parent>
			<h1 className="text-center">All Products</h1>
			<div className="w-full overflow-x-auto">
				<table className="w-full mx-auto text-left text-base sm:text-lg mt-8">
					<thead className="hidden md:table-header-group">
						<tr>
							<th>User ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
						</tr>
					</thead>
					<tbody>
						{users?.map((user, idx) => (
							<tr
								key={user?._id}
								className="bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black md:shadow-none px-4 pb-4 md:from-transparent md:to-transparent flex flex-col gap-4 my-8 md:table-row cursor-pointer border-spacing-4 border-collapse border-t-transparent border-t-[1em]"
							>
								<td onClick={() => navigate(`/admin/user/${user?._id}`)}>
									{user?._id}
								</td>
								<td onClick={() => navigate(`/admin/user/${user?._id}`)}>
									<strong className="md:hidden">Name :</strong> {user?.name}
								</td>
								<td onClick={() => navigate(`/admin/user/${user?._id}`)}>
									<strong className="md:hidden">E-mail :</strong> {user?.email}
								</td>
								<td onClick={() => navigate(`/admin/user/${user?._id}`)}>
									<strong className="md:hidden">Role :</strong> {user?.role}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Parent>
	);
};

export default AdminAllUsers;
