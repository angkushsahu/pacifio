import { ReactNode, useState } from "react";
import { GrUnorderedList } from "react-icons/gr";
import DashboardSidebar from "./dashboardSidebar";

const Parent = ({ children }: { children: ReactNode }) => {
	const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

	return (
		<section className="px-4 sm:px-8 py-4 lg:p-0 fill_screen relative">
			<span
				className="flex lg:hidden items-center gap-4 text-lg cursor-pointer w-fit mb-6"
				onClick={() => setToggleSidebar(prev => !prev)}
			>
				<span>Options</span>
				<GrUnorderedList size={20} />
			</span>
			<div className="flex">
				<DashboardSidebar
					toggleSidebar={toggleSidebar}
					setToggleSidebar={setToggleSidebar}
				/>
				<section className="flex-1 lg:p-6">{children}</section>
			</div>
		</section>
	);
};

export default Parent;
