import ReactStars from "react-rating-stars-component";
import { AiOutlineUser } from "react-icons/ai";
import { IReviews } from "../../../types";

const ProductReviewSection = ({ reviews }: { reviews: IReviews[] }) => {
	const options = {
		edit: false,
		activeColor: "#FFB300",
		color: "#808080",
		isHalf: true,
		size: 20,
	};

	return (
		<section className="mt-12 sm:mt-28">
			<h1 className="text-center mb-10">Reviews</h1>
			<section className="flex gap-8 overflow-x-auto px-6 pb-8">
				{reviews &&
					reviews.map((review, idx) => (
						<div
							key={idx}
							className="shadow-lg shadow-gray-600 rounded-lg px-4 sm:px-6 py-6 min-w-[18em] sm:min-w-[22em]"
						>
							<AiOutlineUser size={40} />
							<h2 className="mt-4">{review.userName}</h2>
							<div className="text-gray-300 flex gap-3 items-center my-3">
								<ReactStars {...options} value={review?.rating} />
							</div>
							<p>{review.message}</p>
						</div>
					))}
			</section>
			{reviews?.length ? (
				<></>
			) : (
				<h2 className="text-center">Be the first to write a review</h2>
			)}
		</section>
	);
};

export default ProductReviewSection;
