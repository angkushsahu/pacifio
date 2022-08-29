import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../components";
import { userLogin, useAppDispatch, useAppSelector } from "../store";
import { ILogin } from "../types";
import { toastOptions, validateEmail } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: FC = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [values, setValues] = useState<ILogin>({ email: "", password: "" });
	const dispatch = useAppDispatch();
	const data = useAppSelector(state => state.getUser);
	const navigate = useNavigate();

	const handleLogin = (e: FormEvent) => {
		e.preventDefault();

		if (!values.email || !values.password) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}
		if (!validateEmail(values.email)) {
			toast.warn("Please enter a valid e-mail address", toastOptions);
			return;
		}

		dispatch(userLogin(values));
	};

	useEffect(() => {
		if (data?.isAuth) {
			navigate("/");
			return;
		}
		if (data?.error && data?.error !== "Please login to access this resource") {
			toast.error(data?.error, toastOptions);
		}
	}, [data?.error, data?.isAuth, navigate]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<>
			{data?.loading ? (
				<Loading />
			) : (
				<section className="px-4 sm:px-8 py-16">
					<div className="center_screen">
						<div className="max-w-[37.5em] w-full mx-auto px-4 sm:px-8 py-6 rounded-md bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black">
							<h1 className="mb-8">Login</h1>
							<form onSubmit={handleLogin}>
								<div className="input_container">
									<label htmlFor="email">Enter your e-mail</label>
									<input
										type="email"
										name="email"
										id="email"
										value={values.email}
										onChange={handleChange}
										placeholder="e.g., johndoe@xyz.com"
									/>
								</div>
								<div className="input_container">
									<label htmlFor="password">Enter password</label>
									<input
										type={showPassword ? "text" : "password"}
										name="password"
										id="password"
										value={values.password}
										onChange={handleChange}
										placeholder="Enter your password"
									/>
									{showPassword ? (
										<BiHide
											className="cursor-pointer text-slate-500"
											onClick={() => setShowPassword(prev => !prev)}
											size={25}
										/>
									) : (
										<BiShow
											className="cursor-pointer text-slate-500"
											onClick={() => setShowPassword(prev => !prev)}
											size={25}
										/>
									)}
								</div>
								<button type="submit" className="primary_button ml-auto mt-6 block">
									Login
								</button>
								<Link to="/signup" className="underline block mt-4">
									Register Instead ?
								</Link>
								<Link to="/forgot-password" className="underline block mt-4">
									Forgot Password
								</Link>
							</form>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default LoginPage;
