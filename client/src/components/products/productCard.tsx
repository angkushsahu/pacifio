import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { IProductCard } from "../../types";
import imageNotFound from "../../assets/images/image-not-found.jfif";

const ProductCard = ({
	_id,
	image,
	name,
	description,
	numberOfReviews,
	price,
	ratings,
	stock,
}: IProductCard) => {
	const navigate = useNavigate();
	const minLength = 100;
	const desc =
		description.length > minLength
			? description.substring(0, minLength) + " . . . . ."
			: description;

	const options = {
		edit: false,
		activeColor: "#FFB300",
		color: "#808080",
		value: ratings,
		isHalf: true,
		size: 20,
	};

	return (
		<article
			className="bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black rounded-md group min-w-[16rem] max-w-[22rem] w-full cursor-pointer"
			onClick={() => navigate(`/product/${_id}`)}
		>
			<div className="overflow-hidden rounded-t-md">
				{image ? (
					<img
						src={image}
						alt={name}
						className="h-auto w-full transition-transform duration-700 group-hover:scale-110"
						loading="lazy"
					/>
				) : (
					<img src={imageNotFound} alt={name} className="h-auto w-full" loading="lazy" />
				)}
			</div>
			<div className="p-4">
				<h2>{name}</h2>
				<p className="my-3 text-gray-300">{desc}</p>
				<h2 className="mb-1">₹ {price.toFixed(2)}</h2>
				{stock > 0 ? (
					<span className="text-green-500">In Stock</span>
				) : (
					<span className="text-red-500">Out Of Stock</span>
				)}
				<div className="text-gray-300 flex gap-3 items-center mt-1">
					<ReactStars {...options} /> &#x28; {numberOfReviews} &#x29;
				</div>
			</div>
		</article>
	);
};

export default ProductCard;
