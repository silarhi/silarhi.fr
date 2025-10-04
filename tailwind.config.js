/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2556cf',
          light: '#5585fb',
          dark: '#172e59',
        },
        'sub-primary': '#ffaf30',
      },
      fontFamily: {
        body: ['var(--body-font)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
