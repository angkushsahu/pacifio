import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createNewProduct, useAppDispatch, useAppSelector } from "../store";
import { Parent } from "../components";
import { ICreateNewProductValues } from "../types";
import { categories, toastOptions } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const AdminNewProduct = () => {
	const dispatch = useAppDispatch();
	const { error } = useAppSelector(state => state.oneProduct);
	const [values, setValues] = useState<ICreateNewProductValues>({
		name: "",
		description: "",
		price: 0,
		images: [],
		category: "",
		stock: 0,
	});
	const createProduct = (e: FormEvent) => {
		e.preventDefault();

		if (
			!values.category ||
			!values.description ||
			!values.name ||
			!values.images ||
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

		dispatch(createNewProduct(values));
		toast.success("Product created successfully", toastOptions);
		setValues({
			name: "",
			description: "",
			price: 0,
			images: [],
			category: "",
			stock: 0,
		});
	};

	useEffect(() => {
		if (error) {
			toast.error(error, toastOptions);
		}
		console.log(__filename);
	}, [error]);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
		const image = e.target.files![0];
		if (!image) {
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = () => {
			setValues({ ...values, images: [...values.images, String(reader.result)] });
		};
	};

	return (
		<Parent>
			<h1 className="text-center mb-8">Create Product</h1>
			<div className="max-w-[37.5em] w-full mx-auto px-4 sm:px-8 py-6 rounded-md bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black">
				<form onSubmit={createProduct}>
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
					<div className="input_container">
						<label htmlFor="picture">Choose Product Picture</label>
						<input
							type="file"
							accept="image/*"
							name="picture"
							id="picture"
							onChange={handleProfilePicture}
						/>
					</div>
					<div className="flex flex-wrap gap-4 items-center">
						{values.images.map((image, idx) => (
							<img
								src={image}
								alt={`img-${idx + 1}`}
								key={idx}
								className="w-20"
								loading="lazy"
							/>
						))}
					</div>
					<button type="submit" className="primary_button ml-auto mt-6 block">
						Create Product
					</button>
				</form>
			</div>
		</Parent>
	);
};

export default AdminNewProduct;
