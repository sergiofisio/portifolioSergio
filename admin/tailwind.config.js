/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        1536: { max: "1536px", min: "1441px" },
        1440: { max: "1440px", min: "1367px" },
        1366: { min: "1366px", max: "1439px" },
        md: { max: "850px" },
      },
      fontFamily: {
        main: ["Poppins", "sans-serif"],
      },
      styles: {
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-track": {
          background: "#fff",
          borderRadius: "10px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#fff",
          borderRadius: "10px",
        },
        "::-webkit-scrollbar-button": {
          display: "block",
        },
        "::-webkit-scrollbar-button:start": {
          display: "none",
        },
        "::-webkit-scrollbar-button:end": {
          display: "none",
        },
        scrollbarWidth: "thin",
        scrollbarColor: "#fff",
        scrollbarArrowColor: "#000",
      },
      borderWidth: {
        DEFAULT: "1px",
      },
      borderColor: {
        gradient: "linear-gradient(to right, #ff0000, #00ff00)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
