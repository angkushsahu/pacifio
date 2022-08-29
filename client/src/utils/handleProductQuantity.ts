import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleProductQuantity = (
	e: ChangeEvent<HTMLInputElement>,
	setNumberOfProducts: Dispatch<SetStateAction<string>>,
	stock: number,
) => {
	const num = e.target.value[e.target.value.length - 1];
	if (
		num === "0" ||
		num === "1" ||
		num === "2" ||
		num === "3" ||
		num === "4" ||
		num === "5" ||
		num === "6" ||
		num === "7" ||
		num === "8" ||
		num === "9" ||
		Number(num) <= stock
	) {
		setNumberOfProducts(prev => e.target.value);
	}
	return;
};

export const addQuantity = (
	numberOfProducts: string,
	setNumberOfProducts: Dispatch<SetStateAction<string>>,
) => {
	const num = Number(numberOfProducts);
	const newNumber = num + 1;
	setNumberOfProducts(prev => String(newNumber));
	return newNumber;
};

export const deleteQuantity = (
	numberOfProducts: string,
	setNumberOfProducts: Dispatch<SetStateAction<string>>,
) => {
	const num = Number(numberOfProducts);
	const newNumber = num <= 1 ? 1 : num - 1;
	setNumberOfProducts(prev => String(newNumber));
	return newNumber;
};
