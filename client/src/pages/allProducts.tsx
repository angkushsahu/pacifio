import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Paginate from "react-js-pagination";
import { IoIosArrowForward } from "react-icons/io";
import ErrorPage from "./errorPage";
import { fetchAllProducts, useAppDispatch, useAppSelector } from "../store";
import Loading from "../components/popups/loading";
import ProductCard from "../components/products/productCard";
import Filter from "../components/products/productDetails/filter";

const AllProducts = () => {
	const { search } = useLocation();
	const item: string = new URLSearchParams(search).get("item") || "";

	const [currentPage, setCurrentPage] = useState<number>(1);
	const setCurrentPageNumber = (pageNumber: number) => {
		setCurrentPage(prev => pageNumber);
	};

	const data = useAppSelector(state => state.allProducts);
	const dispatch = useAppDispatch();

	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [priceRange, setPriceRange] = useState<string>("25000");
	const [category, setCategory] = useState<string>("");
	const [ratings, setRatings] = useState<string>("0");

	useEffect(() => {
		dispatch(
			fetchAllProducts({ item, priceRange, category, page: String(currentPage), ratings }),
		);
	}, [dispatch, item, currentPage, priceRange, category, ratings]);

	return (
		<>
			{data?.loading ? (
				<Loading />
			) : data?.error ? (
				<ErrorPage />
			) : data?.products?.length ? (
				<section className="px-4 sm:px-8 py-12">
					<div className="center_screen relative">
						<h1>All Products</h1>
						{/* filter component */}
						<div className="mt-6">
							<span
								className="flex gap-2 items-center cursor-pointer w-fit"
								onClick={() => setShowFilters(prev => !prev)}
							>
								<p className="text-xl">Filters</p>
								<IoIosArrowForward />
							</span>
							<Filter
								showFilters={showFilters}
								setShowFilters={setShowFilters}
								priceRange={priceRange}
								setPriceRange={setPriceRange}
								setCategory={setCategory}
								ratings={ratings}
								setRatings={setRatings}
							/>
						</div>
						<section className="mt-12 flex flex-wrap gap-12 justify-center items-center">
							{data?.products?.map((product, idx) => (
								<ProductCard
									key={product._id}
									_id={String(product._id)}
									name={product.name}
									description={product.description}
									numberOfReviews={product.numberOfReviews}
									price={product.price}
									ratings={product.ratings}
									image={product.images[0].pic}
									stock={product.stock}
								/>
							))}
						</section>
						{/* pagination component */}
						{data?.products?.length ? (
							<div className="pagination_container">
								<Paginate
									activePage={currentPage}
									itemsCountPerPage={data?.resultPerPage}
									totalItemsCount={data?.numberOfProducts}
									onChange={setCurrentPageNumber}
									nextPageText="Next"
									prevPageText="Previous"
									firstPageText="First"
									lastPageText="Last"
									activeClass="bg-blue-600 text-white"
									activeLinkClass="bg-blue-600 text-white"
									hideDisabled={true}
								/>
							</div>
						) : (
							<></>
						)}
					</div>
				</section>
			) : (
				<section className="center_screen">
					<div className="fill_screen">
						<h2 className="">No product found</h2>
					</div>
				</section>
			)}
		</>
	);
};

export default AllProducts;
