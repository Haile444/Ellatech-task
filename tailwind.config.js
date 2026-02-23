/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure these paths match your folder structure exactly
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}