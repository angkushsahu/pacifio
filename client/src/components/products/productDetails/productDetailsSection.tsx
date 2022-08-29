import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { IProduct } from "../../../types";
import { useAppDispatch, useAppSelector, addToCart, addReview } from "../../../store";
import { addQuantity, deleteQuantity, handleProductQuantity, toastOptions } from "../../../utils";
import "react-toastify/dist/ReactToastify.css";

interface ProductDetailsProps {
	product: IProduct;
	refreshReviews: boolean;
	setRefreshReviews: Dispatch<SetStateAction<boolean>>;
}

const ProductDetailsSection = ({
	product,
	refreshReviews,
	setRefreshReviews,
}: ProductDetailsProps) => {
	const [numberOfProducts, setNumberOfProducts] = useState<string>("1");
	const [review, setReview] = useState<string>("");
	const [star, setStar] = useState<number>(0);
	const dispatch = useAppDispatch();
	const { isAuth } = useAppSelector(state => state.getUser);

	const options = {
		edit: false,
		activeColor: "#FFB300",
		color: "#808080",
		value: product.ratings,
		isHalf: true,
		size: 20,
	};

	const addToCartFunctionality = () => {
		if (!isAuth) {
			toast.warn("Please login to access this resouce", toastOptions);
			return;
		}
		dispatch(addToCart({ id: product._id, quantity: numberOfProducts }));
		toast.success("Added to cart successfully", toastOptions);
	};

	const disableIncrementButton = () => Number(numberOfProducts) >= product.stock;
	const disableDecrementButton = () => Number(numberOfProducts) <= 1;
	const disableAddToCartButton = () =>
		Number(numberOfProducts) < 1 || Number(numberOfProducts) > product.stock;

	const addNewReview = (e: FormEvent) => {
		e.preventDefault();
		if (!review) {
			toast.warn(
				"Please write a short description about your experience with the product",
				toastOptions,
			);
			return;
		}
		if (!star) {
			toast.warn("Please rate the product", toastOptions);
			return;
		}

		dispatch(addReview({ productId: product._id, rating: star, message: review }));
		setStar(0);
		setReview("");
		setRefreshReviews(!refreshReviews);
	};

	return (
		<div className="flex-1">
			{/* Name and reviews */}
			<div className="border-b-[1px] border-b-gray-500 pb-4">
				<h1 className="hidden lg:block mb-2">{product.name}</h1>
				<div className="text-gray-300 flex gap-3 items-center mt-2">
					<ReactStars {...options} /> &#x28; {product.numberOfReviews} &#x29;
				</div>
			</div>
			{/* Price and add-to-cart button */}
			<div className="border-b-[1px] border-b-gray-500 py-8">
				<h2 className="mb-6">₹ {product.price?.toFixed(2)}</h2>
				<section className="flex flex-col sm:flex-row gap-4 items-center">
					<div className="bg-slate-600 relative rounded max-w-[16.25em] w-full h-[2.5em]">
						<button
							type="button"
							className={`bg-blue-600 absolute inset-0 right-auto px-2 rounded-l ${
								disableDecrementButton() ? "cursor-not-allowed" : "cursor-pointer"
							}`}
							onClick={() => deleteQuantity(numberOfProducts, setNumberOfProducts)}
							disabled={disableDecrementButton()}
						>
							<AiOutlineMinus />
						</button>
						<input
							type="text"
							name="number-of-products"
							id="number-of-products"
							value={numberOfProducts}
							onChange={e =>
								handleProductQuantity(e, setNumberOfProducts, product.stock)
							}
							className="border-none outline-none bg-transparent px-12 py-1 max-w-[16.25em] w-full h-[2.5em]"
							disabled={true}
						/>
						<button
							type="button"
							className={`bg-blue-600 absolute inset-0 left-auto px-2 rounded-r ${
								disableIncrementButton() ? "cursor-not-allowed" : "cursor-pointer"
							}`}
							onClick={() => addQuantity(numberOfProducts, setNumberOfProducts)}
							disabled={disableIncrementButton()}
						>
							<AiOutlinePlus />
						</button>
					</div>
					<button
						type="button"
						className={`primary_button flex gap-4 items-center justify-center h-[2.5em] ${
							disableAddToCartButton() ? "cursor-not-allowed" : "cursor-pointer"
						}`}
						disabled={disableAddToCartButton()}
						onClick={addToCartFunctionality}
					>
						<BsFillCartFill />
						Add To Cart
					</button>
				</section>
			</div>
			{/* Status : in-stock or out-of-stock */}
			<div className="border-b-[1px] border-b-gray-500 py-8">
				<span>Status</span> :{" "}
				{product.stock > 0 ? (
					<span className="text-green-500">In Stock</span>
				) : (
					<span className="text-red-500">Out Of Stock</span>
				)}
			</div>
			{/* Description */}
			<div className="border-b-[1px] border-b-gray-500 py-8">
				<p className="description">{product.description}</p>
			</div>
			{/* Write a review */}
			<form onSubmit={addNewReview} className="pt-8 flex flex-col gap-4">
				<textarea
					value={review}
					onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)}
					className="max-w-[60ch] w-full resize-none outline-none border-none bg-slate-600 p-3 h-52 rounded"
					placeholder="Write a review ....."
				></textarea>
				<ReactStars
					{...options}
					value={star}
					edit={true}
					onChange={(e: number) => setStar(e)}
				/>
				<button type="submit" className="primary_button py-2 w-fit mt-2">
					Submit Review
				</button>
			</form>
		</div>
	);
};

export default ProductDetailsSection;
