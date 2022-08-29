import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../components";
import { userSignup, useAppDispatch, useAppSelector } from "../store";
import { ISignUp } from "../types";
import { toastOptions, validateEmail } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const SignupPage: FC = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const [values, setValues] = useState<ISignUp>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		pic: "",
	});
	const dispatch = useAppDispatch();
	const data = useAppSelector(state => state.getUser);
	const navigate = useNavigate();

	const handleSignup = (e: FormEvent) => {
		e.preventDefault();

		if (!values.email || !values.confirmPassword || !values.name || !values.password) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}
		if (!validateEmail(values.email)) {
			toast.warn("Please enter a valid e-mail address", toastOptions);
			return;
		}
		if (values.password !== values.confirmPassword) {
			toast.warn("The password fields should match", toastOptions);
			return;
		}

		dispatch(userSignup(values));
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

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
		const image = e.target.files![0];
		if (!image) {
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = () => {
			setValues({ ...values, pic: String(reader.result) });
		};

		console.log(values);
	};

	return (
		<>
			{data?.loading ? (
				<Loading />
			) : (
				<section className="px-4 sm:px-8 py-16">
					<div className="center_screen">
						<div className="max-w-[37.5em] w-full mx-auto px-4 sm:px-8 py-6 rounded-md bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black">
							<h1 className="mb-8">Signup</h1>
							<form onSubmit={handleSignup}>
								<div className="input_container">
									<label htmlFor="name">Enter your name</label>
									<input
										type="text"
										name="name"
										id="name"
										value={values.name}
										onChange={handleChange}
										placeholder="e.g., john doe"
									/>
								</div>
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
										placeholder="password should be strong"
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
								<div className="input_container">
									<label htmlFor="confirmPassword">Re-enter password</label>
									<input
										type={showConfirmPassword ? "text" : "password"}
										name="confirmPassword"
										id="confirmPassword"
										value={values.confirmPassword}
										onChange={handleChange}
										placeholder="password should match"
									/>
									{showConfirmPassword ? (
										<BiHide
											className="cursor-pointer text-slate-500"
											onClick={() => setShowConfirmPassword(prev => !prev)}
											size={25}
										/>
									) : (
										<BiShow
											className="cursor-pointer text-slate-500"
											onClick={() => setShowConfirmPassword(prev => !prev)}
											size={25}
										/>
									)}
								</div>
								<div className="input_container">
									<label htmlFor="pic">Choose a profile picture</label>
									<input
										type="file"
										accept="image/*"
										name="pic"
										id="pic"
										onChange={handleProfilePicture}
										placeholder="e.g., johndoe@xyz.com"
									/>
								</div>
								<button type="submit" className="primary_button ml-auto mt-6 block">
									Signup
								</button>
								<Link to="/login" className="underline">
									Login Instead ?
								</Link>
							</form>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default SignupPage;
