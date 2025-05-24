// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			// 여기에 추가로 Tailwind CSS 테마 설정하면 됨다.
		},
	},
	plugins: [import('@tailwindcss/line-clamp').default],
};
