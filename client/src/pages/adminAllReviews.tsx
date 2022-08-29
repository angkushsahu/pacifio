import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Parent } from "../components";
import { fetchAllProductsForAdmin, useAppDispatch, useAppSelector } from "../store";

const AdminAllReviews = () => {
	const dispatch = useAppDispatch();
	const { products } = useAppSelector(state => state.allProducts);
	const navigate = useNavigate();

	const options = {
		edit: false,
		activeColor: "#FFB300",
		color: "#808080",
		isHalf: true,
		size: 20,
	};

	useEffect(() => {
		dispatch(fetchAllProductsForAdmin());
		console.log(__filename);
	}, [dispatch]);

	return (
		<Parent>
			<h1 className="text-center">All Reviews</h1>
			<div className="w-full overflow-x-auto">
				<table className="w-full mx-auto text-left text-base sm:text-lg mt-8">
					<thead className="hidden md:table-header-group">
						<tr>
							<th>Name</th>
							<th>Product ID</th>
							<th>Number Of Reviews</th>
							<th>Ratings</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product, idx) => (
							<tr
								key={product?._id}
								className="bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black md:shadow-none px-4 pb-4 md:from-transparent md:to-transparent flex flex-col gap-4 my-8 md:table-row cursor-pointer border-spacing-4 border-collapse border-t-transparent border-t-[1em]"
							>
								<td onClick={() => navigate(`/admin/review/${product?._id}`)}>
									{product?.name}
								</td>
								<td onClick={() => navigate(`/admin/review/${product?._id}`)}>
									<strong className="md:hidden">ID :</strong> {product?._id}
								</td>
								<td onClick={() => navigate(`/admin/review/${product?._id}`)}>
									<strong className="md:hidden">Number Of Reviews :</strong>{" "}
									{product?.numberOfReviews}
								</td>
								<td
									className="flex gap-2 items-center"
									onClick={() => navigate(`/admin/review/${product?._id}`)}
								>
									<strong className="md:hidden">Ratings :</strong>{" "}
									<ReactStars {...options} value={product?.ratings} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Parent>
	);
};

export default AdminAllReviews;
