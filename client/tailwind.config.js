/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"nunito-regular": ["NunitoSans-Italic", "sans-serif"],
				"nunito-semibold": ["NunitoSans-SemiBoldItalic", "sans-serif"],
				overlock: ["Overlock-BoldItalic", "sans-serif"],
			},
			screens: {
				vxs: "350px",
			},
		},
	},
	plugins: [],
};
