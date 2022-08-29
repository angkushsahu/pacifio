import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { AiOutlineUser } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Parent } from "../components";
import { deleteReview, fetchOneProduct, useAppDispatch, useAppSelector } from "../store";

const AdminViewReview = () => {
	const { pathname } = useLocation();
	const path = pathname.substring(pathname.lastIndexOf("/") + 1);
	const { product } = useAppSelector(state => state.oneProduct);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const options = {
		edit: false,
		activeColor: "#FFB300",
		color: "#808080",
		isHalf: true,
		size: 20,
	};

	useEffect(() => {
		dispatch(fetchOneProduct(`/product/${path}`));
		console.log(__filename);
	}, [dispatch, path]);

	const deleteReviewFunctionality = (id: string) => {
		const confirmation = window.confirm("Are you sure you want to delete this review");
		if (!confirmation) {
			return;
		}
		dispatch(deleteReview({ productId: product?._id, id }));
		navigate("/admin/all-reviews");
	};

	return (
		<Parent>
			<h1 className="text-lg sm:text-4xl mb-4">Product # {product?._id}</h1>
			<h2>
				{product?.name} &#40; {product?.category} &#41;
			</h2>
			<h2 className="my-4">Price : ₹ {product?.price?.toFixed(2)}</h2>
			<div className="flex items-center gap-2 mb-6">
				<ReactStars {...options} value={product?.ratings} />
				<strong className="text-gray-400">&#40; {product?.numberOfReviews} &#41;</strong>
			</div>
			<section className="flex items-center gap-4 flex-wrap">
				{product?.reviews &&
					product?.reviews?.map((review, idx) => (
						<div
							key={idx}
							className="relative shadow-lg shadow-gray-600 rounded-lg px-4 sm:px-6 py-6 w-full sm:w-[22em]"
						>
							<MdDelete
								size={25}
								className="absolute top-6 right-5 cursor-pointer"
								onClick={() => deleteReviewFunctionality(review._id || "")}
							/>
							<AiOutlineUser size={40} />
							<h2 className="mt-4">{review.userName}</h2>
							<div className="text-gray-300 flex gap-3 items-center my-3">
								<ReactStars {...options} value={review?.rating} />
							</div>
							<p>{review.message}</p>
						</div>
					))}
			</section>
		</Parent>
	);
};

export default AdminViewReview;
