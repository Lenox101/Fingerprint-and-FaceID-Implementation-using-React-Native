/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", //covers all screens, layouts, and pages in your router.
    "./components/**/*.{js,ts,jsx,tsx}", //covers all components in your app.
    "./hooks/**/*.{js,ts,jsx,tsx}" //covers all hooks in your app.
  ],
  presets:[require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
