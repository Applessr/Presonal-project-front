/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ใช้คลาสเพื่อสลับระหว่างธีม
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        myTheme: {
          "primary": '#22A094',
          "secondary": "#E2FAF8",
          "red": "#DB5252",
          "lightRed": "#F6DBDB",
          "info": "#6e6e6ec8",
        }
      }
    ],
  },
  plugins: [require("daisyui")],
};
