import { FC } from "react";
import { HeroSection } from "../components";

const HomePage: FC = () => {
	return (
		<section className="w-full ml-[50%] p-4 sm:p-8 -translate-x-1/2 bg-black">
			<HeroSection />
		</section>
	);
};

export default HomePage;
