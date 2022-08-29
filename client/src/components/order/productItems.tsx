import { IConfirmOrderProductItemProps } from "../../types";
import errorImage from "../../assets/images/error.png";

const ProductItems = (product: IConfirmOrderProductItemProps) => {
	const totalPrice = product.price * product.quantity;

	return (
		<article className="flex flex-col md:flex-row gap-4 items-center justify-center my-6 py-6 px-4 rounded-md shadow-lg shadow-gray-900">
			{product?.image ? (
				<img
					src={product?.image}
					alt={product?.name}
					className="w-28 rounded-md"
					loading="lazy"
				/>
			) : (
				<img
					src={errorImage}
					alt={product?.name}
					className="w-28 rounded-md"
					loading="lazy"
				/>
			)}
			<h2 className="flex-1">{product?.name}</h2>
			<p>
				{product?.quantity} X ₹ {product?.price?.toFixed(2)}
			</p>
			<h2>₹ {totalPrice.toFixed(2)}</h2>
		</article>
	);
};

export default ProductItems;
