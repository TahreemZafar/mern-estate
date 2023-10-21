/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          "header1": "rgb(204, 226, 253)",
      },
    },
    
  },
  plugins: [],
  
}