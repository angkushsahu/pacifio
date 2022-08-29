import logo from "../../assets/images/logo.png";

const contactLinks = [
	{
		link: "https://angkush.vercel.app/",
		background: "bg-[#008080]",
		imageSrc:
			"https://img.shields.io/badge/my_portfolio-teal?style=for-the-badge&logo=ko-fi&logoColor=white",
		imgAlt: "portfolio",
	},
	{
		link: "https://linkedin.com/in/angkush-sahu-0409311bb",
		background: "bg-[#0a66c2]",
		imageSrc:
			"https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white",
		imgAlt: "linkedin",
	},
	{
		link: "https://angkush.vercel.app/contact",
		background: "bg-[#e05d44]",
		imageSrc:
			"https://img.shields.io/badge/Mail-red?style=for-the-badge&logo=gmail&logoColor=white",
		imgAlt: "contact",
	},
	{
		link: "https://github.com/angkushsahu",
		background: "bg-[#555555]",
		imageSrc:
			"https://img.shields.io/badge/Github-gray?style=for-the-badge&logo=github&logoColor=white",
		imgAlt: "github",
	},
];

const Footer = () => {
	return (
		<footer className="px-4 sm:px-8 bg-black">
			<div className="flex flex-col lg:flex-row items-center justify-between center_screen py-10">
				<div>
					<div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-6">
						<img src={logo} alt="logo" className="w-12" loading="lazy" />
						<h1 className="text-blue-600">PACIFIO</h1>
					</div>
					<h2 className="text-center">A shop to fulfill the needs of programmers</h2>
				</div>
				<div>
					<p className="description mt-20 lg:mt-0 mb-4 lg:mb-6 text-center lg:text-left">
						Developer : Angkush Sahu
					</p>
					<p className="text-center">Contact me</p>
					{contactLinks.map((contact, idx) => (
						<a
							key={idx}
							href={contact.link}
							rel="noopener noreferrer"
							target="_blank"
							className={`w-40 mx-auto flex items-center justify-center ${contact.background} my-4`}
						>
							<img src={contact.imageSrc} alt={contact.imgAlt} loading="lazy" />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
