/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				main: '#FD9745',
				mainAccent: '#fc7303', // not needed for shadcn components
				overlay: 'rgba(0,0,0,0.8)', // background color overlay for alert dialogs, modals, etc.

				// light mode
				bg: '#fff4e0',
				text: '#000',
				border: '#000',

				// dark mode
				darkBg: '#272933',
				darkText: '#eeefe9',
				darkBorder: '#000',
				secondaryBlack: '#212121', // opposite of plain white, not used pitch black because borders and box-shadows are that color 
			},
			borderRadius: {
				base: '11px'
			},
			boxShadow: {
				light: '5px 6px 0px 0px #000',
				dark: '5px 6px 0px 0px #000',
			},
			translate: {
				boxShadowX: '5px',
				boxShadowY: '6px',
				reverseBoxShadowX: '-5px',
				reverseBoxShadowY: '-6px',
			},
			fontWeight: {
				base: '600',
				heading: '800',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}
