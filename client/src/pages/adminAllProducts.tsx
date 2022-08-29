import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Parent } from "../components";
import { fetchAllProductsForAdmin, deleteProduct, useAppDispatch, useAppSelector } from "../store";

const AdminAllProducts = () => {
	const dispatch = useAppDispatch();
	const { products } = useAppSelector(state => state.allProducts);
	const { loading } = useAppSelector(state => state.oneProduct);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchAllProductsForAdmin());
	}, [dispatch, loading]);

	const deleteProductFunctionality = (id: string) => {
		const confirmation = window.confirm("Are you sure you want to delete this product");
		if (!confirmation) {
			return;
		}
		dispatch(deleteProduct(id));
	};

	return (
		<Parent>
			<h1 className="text-center">All Products</h1>
			<div className="w-full overflow-x-auto">
				<table className="w-full mx-auto text-left text-base sm:text-lg mt-8">
					<thead className="hidden md:table-header-group">
						<tr>
							<th>Name</th>
							<th>Product ID</th>
							<th>Stock</th>
							<th>Price</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product, idx) => (
							<tr
								key={product?._id}
								className="bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black md:shadow-none px-4 pb-4 md:from-transparent md:to-transparent flex flex-col gap-4 my-8 md:table-row cursor-pointer border-spacing-4 border-collapse border-t-transparent border-t-[1em]"
							>
								<td onClick={() => navigate(`/product/${product?._id}`)}>
									{product?.name}
								</td>
								<td onClick={() => navigate(`/product/${product?._id}`)}>
									<strong className="md:hidden">ID :</strong> {product?._id}
								</td>
								<td onClick={() => navigate(`/product/${product?._id}`)}>
									<strong className="md:hidden">Stock :</strong> {product?.stock}
								</td>
								<td onClick={() => navigate(`/product/${product?._id}`)}>
									<strong className="md:hidden">Price :</strong> ₹{" "}
									{product?.price?.toFixed(2)}
								</td>
								<td className="flex gap-3 items-center">
									<MdModeEdit
										size={25}
										className="cursor-pointer"
										onClick={() =>
											navigate(`/admin/update-product/${product?._id}`)
										}
									/>
									<MdDelete
										size={25}
										className="cursor-pointer"
										onClick={() => deleteProductFunctionality(product?._id)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Parent>
	);
};

export default AdminAllProducts;
