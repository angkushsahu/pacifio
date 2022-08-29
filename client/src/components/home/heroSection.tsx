import { NavigateFunction, useNavigate } from "react-router-dom";
import homeImg from "../../assets/images/homepage.jpg";

const HeroSection = () => {
	const navigate: NavigateFunction = useNavigate();

	return (
		<div className="min-h-[calc(100vh-7.5rem)] center_screen flex flex-col md:flex-row items-center justify-center gap-4">
			<div className="w-full">
				<h1 className="md:text-5xl lg:text-6xl mb-6 text-blue-600">PACIFIO</h1>
				<h2 className="md:text-2xl lg:text-3xl mb-6">
					A shop to fulfill the needs of programmers
				</h2>
				<button
					type="button"
					className="primary_button mt-6"
					onClick={() => navigate("/all-products")}
				>
					See all Products
				</button>
			</div>
			<div className="w-full">
				<img
					src={homeImg}
					alt="peripherals"
					className="w-full max-w-[800px] shadow-2xl shadow-black"
					loading="lazy"
				/>
			</div>
		</div>
	);
};

export default HeroSection;
