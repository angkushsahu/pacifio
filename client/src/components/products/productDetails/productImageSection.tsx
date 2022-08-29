import Carousel from "react-material-ui-carousel";
import { IProductImageSectionProps } from "../../../types";
import imageNotFound from "../../../assets/images/image-not-found.jfif";

const ProductImageSection = ({ images, name }: IProductImageSectionProps) => {
	return (
		<div className="flex-1">
			<Carousel sx={{ position: "sticky", top: "5rem" }}>
				{images ? (
					images.map((image, idx) => (
						<img
							key={idx}
							src={image.pic}
							alt={`${name}-${idx + 1}`}
							className="w-96 mx-auto"
							loading="lazy"
						/>
					))
				) : (
					<img
						src={imageNotFound}
						alt="unavailable"
						className="w-96 mx-auto"
						loading="lazy"
					/>
				)}
			</Carousel>
		</div>
	);
};

export default ProductImageSection;
