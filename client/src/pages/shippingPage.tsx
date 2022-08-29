import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";
import { addShippingDetails, useAppDispatch } from "../store";
import { ProgressBar } from "../components";
import { IShippingValues } from "../types";
import { toastOptions } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const ShippingPage = () => {
	const dispatch = useAppDispatch();
	const [values, setValues] = useState({
		address: sessionStorage.getItem("address") || "",
		city: sessionStorage.getItem("city") || "",
		pincode: sessionStorage.getItem("pincode") || "",
		phoneNumber: sessionStorage.getItem("phoneNumber") || "",
		country: sessionStorage.getItem("country") || "",
		state: sessionStorage.getItem("state") || "",
	} as IShippingValues);
	const navigate = useNavigate();

	const submitShippingDetails = async (e: FormEvent) => {
		e.preventDefault();

		if (
			!values.address ||
			!values.city ||
			!values.country ||
			!values.phoneNumber ||
			!values.pincode ||
			!values.state
		) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}

		sessionStorage.setItem("address", values.address);
		sessionStorage.setItem("city", values.city);
		sessionStorage.setItem("pincode", values.pincode);
		sessionStorage.setItem("phoneNumber", values.phoneNumber);
		sessionStorage.setItem("country", values.country);
		sessionStorage.setItem("state", values.state);

		dispatch(addShippingDetails(values));
		navigate("/confirm-order");
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<section className="center_screen">
			<div className="fill_screen px-4 sm:px-8 py-12">
				<ProgressBar />
				<div className="mt-6 max-w-[37.5em] w-full mx-auto px-4 sm:px-8 py-6 rounded-md bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg shadow-black">
					<h1 className="mb-8">Shipping Details</h1>
					<form onSubmit={submitShippingDetails}>
						<div className="input_container">
							<label htmlFor="address">Enter your address</label>
							<input
								type="text"
								name="address"
								id="address"
								value={values.address}
								onChange={handleChange}
								placeholder="e.g., walker street, somewhere"
							/>
						</div>
						<div className="input_container">
							<label htmlFor="city">Enter your city</label>
							<input
								type="text"
								name="city"
								id="city"
								value={values.city}
								onChange={handleChange}
								placeholder="e.g., Kolkata"
							/>
						</div>
						<div className="input_container">
							<label htmlFor="pincode">Enter your pincode</label>
							<input
								type="text"
								name="pincode"
								id="pincode"
								value={values.pincode}
								onChange={handleChange}
								placeholder="e.g., 765432"
							/>
						</div>
						<div className="input_container">
							<label htmlFor="phoneNumber">Enter your phone number</label>
							<input
								type="text"
								name="phoneNumber"
								id="phoneNumber"
								value={values.phoneNumber}
								onChange={handleChange}
								placeholder="e.g., 9988776655"
							/>
						</div>
						<div className="input_container">
							<label htmlFor="country">Enter your country</label>
							<select
								name="country"
								id="country"
								value={values.country}
								onChange={handleChange}
							>
								<option value=""> -- Select -- </option>
								{Country.getAllCountries().map((item: any) => (
									<option key={item.isoCode} value={item.isoCode}>
										{item.name}
									</option>
								))}
							</select>
						</div>
						{values.country ? (
							<div className="input_container">
								<label htmlFor="state">Enter your state</label>
								<select
									name="state"
									id="state"
									value={values.state}
									onChange={handleChange}
								>
									<option value=""> -- Select -- </option>
									{State.getStatesOfCountry(values.country).map((item: any) => (
										<option key={item.isoCode} value={item.isoCode}>
											{item.name}
										</option>
									))}
								</select>
							</div>
						) : (
							<></>
						)}
						<button type="submit" className="primary_button ml-auto mt-6 block">
							Submit
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ShippingPage;
