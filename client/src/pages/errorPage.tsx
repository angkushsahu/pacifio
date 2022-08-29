import { FC } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import errorImg from "../assets/images/error.png";

const ErrorPage: FC = () => {
	const navigate: NavigateFunction = useNavigate();

	return (
		<section className="fill_screen flex flex-col items-center justify-center">
			<img src={errorImg} alt="error" className="w-[37.5em]" loading="lazy" />
			<h2>This page does not exist</h2>
			<button
				type="button"
				className="primary_button mt-8"
				onClick={() => navigate("/", { replace: true })}
			>
				Back to Home
			</button>
		</section>
	);
};

export default ErrorPage;
