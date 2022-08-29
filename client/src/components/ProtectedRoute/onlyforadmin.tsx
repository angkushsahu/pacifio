import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";

const Protected = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const { isAuth, user } = useAppSelector(state => state.getUser);

	useEffect(() => {
		if (!isAuth) {
			navigate("/login");
		}
		if (user?.role !== "admin") {
			navigate("/");
		}
		console.log(__filename);
	}, [navigate, isAuth, user?.role]);

	return <>{children}</>;
};

export default Protected;
