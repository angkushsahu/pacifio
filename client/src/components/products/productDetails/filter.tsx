import { ChangeEvent } from "react";
import { ImCancelCircle } from "react-icons/im";
import { IFilterProps } from "../../../types";
import { categories } from "../../../utils";

const Filter = ({
	setShowFilters,
	showFilters,
	priceRange,
	setPriceRange,
	setCategory,
	ratings,
	setRatings,
}: IFilterProps) => {
	return (
		<aside
			className={`fixed z-[1] bg-slate-800 inset-0 right-auto px-8 py-6 shadow-lg shadow-black transition-transform duration-300 origin-left ${
				showFilters ? "scale-x-100" : "scale-x-0"
			}`}
		>
			<ImCancelCircle
				size={25}
				className="cursor-pointer"
				onClick={() => setShowFilters(prev => false)}
			/>
			<h2 className="mt-10">Filters</h2>
			<input
				type="range"
				name="filter"
				id="filter"
				value={priceRange}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setPriceRange(e.target.value)}
				min={0}
				max={25000}
				className="w-52"
			/>
			<p className="mt-2 mb-6">Range : 0 to ₹ {priceRange}</p>
			<h2 className="mb-2">Categories</h2>
			<ul>
				{categories.map(({ keyword, value }, idx) => (
					<li
						key={idx}
						className="cursor-pointer w-fit my-1"
						onClick={() => {
							setCategory(value);
							setShowFilters(prev => false);
						}}
					>
						{keyword}
					</li>
				))}
			</ul>
			<h2 className="mt-10">Ratings</h2>
			<input
				type="range"
				name="ratings"
				id="ratings"
				value={ratings}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setRatings(e.target.value)}
				min={0}
				max={5}
				className="w-52"
			/>
			<p className="mt-2">Ratings : above {ratings}</p>
		</aside>
	);
};

export default Filter;
