import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";

const OnlyForAdmin = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const { isAuth } = useAppSelector(state => state.getUser);

	useEffect(() => {
		if (!isAuth) {
			navigate("/login");
		}
		console.log(__filename);
	}, [navigate, isAuth]);

	return <>{children}</>;
};

export default OnlyForAdmin;
