import { useLocation, useNavigate } from "react-router-dom";
import { MdLocalShipping } from "react-icons/md";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import { BsBank2 } from "react-icons/bs";

const Progress = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const path = pathname.substring(1);

	return (
		<section className="flex items-center justify-center gap-4 p-2">
			<div
				className="flex flex-col items-center justify-center cursor-pointer"
				onClick={() => navigate("/shipping")}
			>
				<MdLocalShipping
					size={25}
					className={path === "shipping" ? "text-white" : "text-green-500"}
				/>
				<p className={`text-xs ${path === "shipping" ? "text-white" : "text-green-500"}`}>
					Shipping
				</p>
			</div>
			<div
				className={`flex-1 h-[0.2px] ${
					path === "shipping" ? "bg-gray-500" : "bg-green-500"
				}`}
			></div>
			<div
				className="flex gap-1 flex-col items-center justify-center cursor-pointer"
				onClick={() => navigate("/confirm-order")}
			>
				<BsFillFileEarmarkCheckFill
					size={25}
					className={
						path === "shipping"
							? "text-gray-500"
							: path === "confirm-order"
							? "text-white"
							: "text-green-500"
					}
				/>
				<p
					className={`text-xs ${
						path === "shipping"
							? "text-gray-500"
							: path === "confirm-order"
							? "text-white"
							: "text-green-500"
					}`}
				>
					Confirm
				</p>
			</div>
			<div
				className={`flex-1 h-[0.2px] ${
					path === "payment" ? "bg-green-500" : "bg-gray-500"
				}`}
			></div>
			<div
				className="flex gap-1 flex-col items-center justify-center cursor-pointer"
				onClick={() => navigate("/payment")}
			>
				<BsBank2
					size={25}
					className={path === "payment" ? "text-white" : "text-gray-500"}
				/>
				<p className={`text-xs ${path === "payment" ? "text-white" : "text-gray-500"}`}>
					Payment
				</p>
			</div>
		</section>
	);
};

export default Progress;
