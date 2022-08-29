import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductImageSection from "../components/products/productDetails/productImageSection";
import ProductDetailsSection from "../components/products/productDetails/productDetailsSection";
import ProductReviewSection from "../components/products/productDetails/productReviewSection";
import { fetchOneProduct, getAllReviews, useAppDispatch, useAppSelector } from "../store";
import Loading from "../components/popups/loading";
import ErrorPage from "./errorPage";

const Product = () => {
	const [refreshReviews, setRefreshReviews] = useState<boolean>(false);
	const { pathname } = useLocation();
	const data = useAppSelector(state => state.oneProduct);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchOneProduct(pathname));

		dispatch(getAllReviews(data?.product?._id || ""));
		window.scrollTo(0, 0);
		// eslint-disable-next-line
	}, [dispatch, pathname, refreshReviews]);

	return (
		<>
			{data?.loading ? (
				<Loading />
			) : !data?.product || data?.error ? (
				<ErrorPage />
			) : (
				<section className="fill_screen center_screen px-4 sm:px-8 py-10 lg:py-20">
					<section className="flex flex-col lg:flex-row gap-8">
						<h1 className="lg:hidden mb-2">{data?.product?.name}</h1>
						<ProductImageSection
							name={data?.product?.name}
							images={data?.product?.images}
						/>
						<ProductDetailsSection
							product={data?.product}
							refreshReviews={refreshReviews}
							setRefreshReviews={setRefreshReviews}
						/>
					</section>
					<ProductReviewSection reviews={data?.product?.reviews} />
				</section>
			)}
		</>
	);
};

export default Product;
