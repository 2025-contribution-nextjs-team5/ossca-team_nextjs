/* eslint-disable */
// tailwind.config.js
const lineClamp = require('@tailwindcss/line-clamp');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				'ossca-mint': {
					100: 'oklch(0.95 0.0489 180.52)',
					200: 'oklch(0.93 0.055 180.67)',
					300: 'oklch(0.89 0.1663 172.72)',
					400: 'oklch(0.69 0.1314 173.3407)',
					500: 'oklch(0.72 0.1308 174.9)',
					600: 'oklch(0.715 0.142 178.7)',
				},
				'ossca-gray': {
					100: 'oklch(0.89 0 0)',
					200: 'oklch(0.82 0.0036 174.46)',
				},
			},
		},
	},
	plugins: [lineClamp],
};
