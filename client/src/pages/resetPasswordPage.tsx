import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { resetPassword, useAppDispatch, useAppSelector } from "../store";
import { BiHide, BiShow } from "react-icons/bi";
import { IResetPassword } from "../types";
import { toastOptions } from "../utils";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage: FC = () => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const data = useAppSelector(state => state.getUser);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const [values, setValues] = useState<IResetPassword>({ password: "", confirmPassword: "" });

	const handlePasswordReset = (e: FormEvent) => {
		e.preventDefault();

		if (!values.confirmPassword || !values.password) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}
		if (values.password !== values.confirmPassword) {
			toast.warn("The password fields should match", toastOptions);
			return;
		}

		dispatch(resetPassword({ ...values, id: pathname }));
	};

	useEffect(() => {
		if (data?.message === "Please login to access this resource") {
			return;
		}
		if (data?.message === "New password updated") {
			toast.success(data?.message, toastOptions);
			return;
		}
		if (data?.message) {
			toast.error(data?.message, toastOptions);
		}
	}, [data?.message]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<section className="px-4 sm:px-8 py-16">
			<div className="center_screen">
				<div className="max-w-[37.5em] w-full mx-auto px-4 sm:px-8 py-6 rounded-md bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black">
					<h1 className="mb-8">Reset Password</h1>
					<form onSubmit={handlePasswordReset}>
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
						<button type="submit" className="primary_button ml-auto mt-6 block">
							Reset
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ResetPasswordPage;
