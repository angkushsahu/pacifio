import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Parent } from "../components";
import { fetchOneProduct, updateProduct, useAppDispatch, useAppSelector } from "../store";
import { IUpdateProductValues } from "../types";
import { categories, toastOptions } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const AdminUpdateProduct = () => {
	const { pathname } = useLocation();
	const path = pathname.substring(pathname.lastIndexOf("/") + 1);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchOneProduct(`/product/${path}`));
	}, [dispatch, path]);

	const { product, error } = useAppSelector(state => state.oneProduct);

	const [values, setValues] = useState<IUpdateProductValues>({
		name: "",
		description: "",
		price: 0,
		category: "",
		stock: 0,
	});

	const updateProductFunctionality = (e: FormEvent) => {
		e.preventDefault();

		if (
			!values.category ||
			!values.description ||
			!values.name ||
			!values.price ||
			!values.stock
		) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}
		if (!Number(values.price)) {
			toast.warn("Product price format is not valid", toastOptions);
			return;
		}

		dispatch(updateProduct({ id: product?._id || "", values }));
		toast.success("Product updated successfully", toastOptions);
		navigate("/admin/all-products");
	};

	useEffect(() => {
		if (error) {
			toast.error(error, toastOptions);
		}
	}, [error]);

	useEffect(() => {
		setValues({
			name: product?.name || "",
			description: product?.description || "",
			price: product?.price || 0,
			category: product?.category || "",
			stock: product?.stock || 0,
		});
	}, [product]);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<Parent>
			<h1 className="text-center mb-8">Update Product</h1>
			<div className="max-w-[37.5em] w-full mx-auto px-4 sm:px-8 py-6 rounded-md bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black">
				<form onSubmit={updateProductFunctionality}>
					<div className="input_container">
						<label htmlFor="name">Enter Product Name</label>
						<input
							type="text"
							name="name"
							id="name"
							value={values.name}
							onChange={handleChange}
							placeholder="e.g., dragon nitro pro"
						/>
					</div>
					<div className="input_container">
						<label htmlFor="description">Enter Product Description</label>
						<input
							type="text"
							name="description"
							id="description"
							value={values.description}
							onChange={handleChange}
							placeholder="e.g., This is a cool product from dragon nitro pro ...."
						/>
					</div>
					<div className="input_container">
						<label htmlFor="price">Enter Product Price</label>
						<input
							type="number"
							name="price"
							id="price"
							value={values.price}
							onChange={handleChange}
							placeholder="e.g., 2000.00 (only in number, no symbols allowed)"
						/>
					</div>
					<div className="input_container">
						<label htmlFor="stock">Enter Product Stock</label>
						<input
							type="number"
							name="stock"
							id="stock"
							value={values.stock}
							onChange={handleChange}
							placeholder="e.g., 200 (only in number, no symbols allowed)"
						/>
					</div>
					<div className="input_container">
						<label htmlFor="category">Enter Product Category</label>
						<select
							name="category"
							id="category"
							value={values.category}
							onChange={handleChange}
						>
							<option value=""> -- Select -- </option>
							{categories.map(({ keyword, value }, idx) => (
								<option key={idx} value={value}>
									{keyword}
								</option>
							))}
						</select>
					</div>
					<button type="submit" className="primary_button ml-auto mt-6 block">
						Update Product
					</button>
				</form>
			</div>
		</Parent>
	);
};

export default AdminUpdateProduct;
