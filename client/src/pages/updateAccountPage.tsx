import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector, updateUser, useAppDispatch } from "../store";
import { IUpdateAccount } from "../types";
import { toastOptions, validateEmail } from "../utils";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
	const { user } = useAppSelector(state => state.getUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [values, setValues] = useState<IUpdateAccount>({
		name: user?.name,
		email: user?.email,
		pic: "",
	});

	const handleAccountUpdate = (e: FormEvent) => {
		e.preventDefault();

		if (values.email === user?.email && values.name === user?.name && values.pic === "") {
			return;
		}
		if (!values.email || !values.name) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}
		if (!validateEmail(values.email)) {
			toast.warn("Please enter a valid e-mail address", toastOptions);
			return;
		}

		dispatch(updateUser(values));
		navigate("/account");
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

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<section className="px-4 sm:px-8 py-16">
			<div className="center_screen">
				<div className="max-w-[37.5em] w-full mx-auto px-4 sm:px-8 py-6 rounded-md bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black">
					<h1 className="mb-8">Update Account</h1>
					<form onSubmit={handleAccountUpdate}>
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
							Update
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default UpdateProfilePage;
