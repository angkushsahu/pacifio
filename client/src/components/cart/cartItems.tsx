import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ImBin2 } from "react-icons/im";
import { ICartItemProps } from "../../types";
import { addToCart, deleteFromCart, useAppDispatch } from "../../store";
import { addQuantity, deleteQuantity, handleProductQuantity } from "../../utils";
import errorImage from "../../assets/images/error.png";

const CartItems = ({ item }: ICartItemProps) => {
	const [numberOfProducts, setNumberOfProducts] = useState<string>(`${item?.quantity}`);
	const [totalPrice, setTotalPrice] = useState<number>(
		Number(numberOfProducts) * item?.product?.price || 1,
	);
	const disableIncrementButton = () => Number(numberOfProducts) >= item?.product?.stock;
	const disableDecrementButton = () => Number(numberOfProducts) <= 1;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const addQuantityAndUpdate = async () => {
		const num = addQuantity(numberOfProducts, setNumberOfProducts);
		dispatch(addToCart({ id: item?.product?._id || "", quantity: String(num) }));
	};

	const deleteQuantityAndUpdate = async () => {
		const num = deleteQuantity(numberOfProducts, setNumberOfProducts);
		dispatch(addToCart({ id: item?.product?._id || "", quantity: String(num) }));
	};

	const removeItemFromCart = () => {
		dispatch(deleteFromCart(item?.product?._id || ""));
	};

	useEffect(() => {
		setTotalPrice(Number(numberOfProducts) * item?.product?.price);
	}, [numberOfProducts, item?.product?.price]);

	return (
		<article className="flex flex-col md:flex-row gap-4 items-center shadow-lg shadow-gray-900 p-6 my-8">
			<div
				className="mx-auto md:mx-0 cursor-pointer"
				onClick={() => navigate(`/product/${item?.product?._id}`)}
			>
				{item?.product?.images ? (
					<img
						src={item?.product?.images[0]?.pic}
						alt={item?.product?.name}
						className="w-28 rounded-md"
						loading="lazy"
					/>
				) : (
					<img
						src={errorImage}
						alt={item?.product?.name}
						className="w-28 rounded-md"
						loading="lazy"
					/>
				)}
			</div>
			<div className="flex-1">
				<h2
					className="text-center md:text-left cursor-pointer"
					onClick={() => navigate(`/product/${item?.product?._id}`)}
				>
					{item?.product?.name}
				</h2>
				<p
					className="mt-2 text-center md:text-left cursor-pointer"
					onClick={() => navigate(`/product/${item?.product?._id}`)}
				>
					<strong>Price : ₹ {item?.product?.price}</strong>
				</p>
				<div className="bg-slate-600 relative rounded max-w-[16.25em] w-full h-[2.5em] mt-6">
					<button
						type="button"
						className={`bg-blue-600 absolute inset-0 right-auto px-2 rounded-l ${
							disableDecrementButton() ? "cursor-not-allowed" : "cursor-pointer"
						}`}
						onClick={deleteQuantityAndUpdate}
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
							handleProductQuantity(e, setNumberOfProducts, item?.product?.stock)
						}
						className="border-none outline-none bg-transparent px-12 py-1 max-w-[16.25em] w-full h-[2.5em]"
						disabled={true}
					/>
					<button
						type="button"
						className={`bg-blue-600 absolute inset-0 left-auto px-2 rounded-r ${
							disableIncrementButton() ? "cursor-not-allowed" : "cursor-pointer"
						}`}
						onClick={addQuantityAndUpdate}
						disabled={disableIncrementButton()}
					>
						<AiOutlinePlus />
					</button>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center gap-4">
				<h2>₹ {totalPrice.toFixed(2)}</h2>
				<button
					className="primary_danger_button py-1 px-2 flex items-center justify-center gap-2"
					onClick={removeItemFromCart}
				>
					<ImBin2 size={15} color="#ffffff" />
					<p>Remove Item</p>
				</button>
			</div>
		</article>
	);
};

export default CartItems;
