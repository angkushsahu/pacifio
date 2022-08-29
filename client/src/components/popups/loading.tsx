const Loading = () => {
	return (
		<section className="flex flex-col gap-10 items-center justify-center min-h-screen">
			<div className="flex justify-center items-center gap-8 sm:gap-16">
				<div className="animate-ping w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-white mx-auto"></div>
				<div className="animate-ping delay-300 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-white mx-auto"></div>
				<div className="animate-ping delay-600 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-white mx-auto"></div>
				<div className="animate-ping delay-1000 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-white mx-auto"></div>
			</div>
			<p className="text-center text-lg animate-pulse duration-75">Loading ....</p>
		</section>
	);
};

export default Loading;
