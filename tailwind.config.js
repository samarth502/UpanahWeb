/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        'custom': '75vh', // Custom value for min-height
      },
    },
  },
  plugins: [  require('@tailwindcss/forms'),],
}

