/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mythems : {
          "primary" : '#22A094',
          "secondary" : "#E2FAF8",
          "red" : "#DB5252",
          "lightRed" : "#F6DBDB",
        }
      }
    ],
  },
  plugins: [require("daisyui")],
};
