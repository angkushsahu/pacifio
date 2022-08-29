import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword, useAppDispatch, useAppSelector } from "../store";
import { toastOptions, validateEmail } from "../utils";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage: FC = () => {
	const [email, setEmail] = useState<string>("");
	const dispatch = useAppDispatch();
	const data = useAppSelector(state => state.getUser);
	const navigate = useNavigate();

	const handlePasswordResetRequest = (e: FormEvent) => {
		e.preventDefault();

		if (!email) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}
		if (!validateEmail(email)) {
			toast.warn("Please enter a valid e-mail address", toastOptions);
			return;
		}

		dispatch(forgotPassword(email));
	};

	useEffect(() => {
		if (data?.message === "Please login to access this resource") {
			return;
		}
		if (
			data?.message ===
			`Password reset link has been sent to ${email}, please check your e-mail`
		) {
			toast.success(data?.message, toastOptions);
			navigate("/login");
			return;
		}
		if (data?.message) {
			toast.error(data?.message, toastOptions);
		}
		// eslint-disable-next-line
	}, [data?.message, navigate]);

	return (
		<section className="px-4 sm:px-8 py-16">
			<div className="center_screen">
				<div className="max-w-[37.5em] w-full mx-auto px-4 sm:px-8 py-6 rounded-md bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black">
					<h1 className="mb-8">Forgot Password</h1>
					<form onSubmit={handlePasswordResetRequest}>
						<div className="input_container">
							<label htmlFor="email">Enter your e-mail</label>
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setEmail(e.target.value)
								}
								placeholder="e.g., johndoe@xyz.com"
							/>
						</div>
						<button type="submit" className="primary_button ml-auto mt-6 block">
							Submit
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ForgotPasswordPage;
