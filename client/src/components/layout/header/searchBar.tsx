import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { NavigateFunction, useNavigate } from "react-router-dom";

const SearchBar = ({
	setShowSearchBar,
}: {
	setShowSearchBar: Dispatch<SetStateAction<boolean>>;
}) => {
	const navigate: NavigateFunction = useNavigate();
	const [searchText, setSearchText] = useState<string>("");

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		if (!searchText) {
			setShowSearchBar(prev => false);
			return;
		}

		setSearchText("");
		setShowSearchBar(prev => false);
		navigate(`/all-products?item=${searchText}`);
	};

	return (
		<form onSubmit={handleSearch} className="py-2 bg-black">
			<div className="px-4 sm:px-8 center_screen relative">
				<label htmlFor="searchText"></label>
				<input
					type="text"
					name="searchText"
					id="searchText"
					value={searchText}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
					className="w-full text-black outline-none border-none rounded-md px-4 py-2"
					placeholder="Search items ...."
					autoFocus={true}
				/>
				<button
					type="submit"
					className="m-0 absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 outline-none border-none"
				>
					{searchText ? (
						<BsSearch size={22} color="#191919" className="cursor-pointer" />
					) : (
						<ImCancelCircle size={22} color="#191919" className="cursor-pointer" />
					)}
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
