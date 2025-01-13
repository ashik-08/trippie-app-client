const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        "primary-50": "#EDFCF3",
        "primary-100": "#D4F7E1",
        "primary-200": "#ACEEC8",
        "primary-300": "#76DFA9",
        "primary-base": "#34B778",
        "primary-500": "#1BAE6C",
        "primary-600": "#0F8C56",
        "primary-700": "#0C7048",
        "primary-800": "#0C593A",
        "primary-900": "#0B4932",
        "secondary-50": "#EFF8FF",
        "secondary-100": "#DBEEFE",
        "secondary-200": "#BFE2FE",
        "secondary-300": "#93D2FD",
        "secondary-400": "#5FB8FB",
        "secondary-500": "#3A98F7",
        "secondary-base": "#257BEC",
        "secondary-700": "#1C64D9",
        "secondary-800": "#1D51B0",
        "secondary-900": "#1D478B",
        slate: "#B1D4DB",
        dark: "#252525",
        outerSpace: "#333D43",
        neutralBlack: "#263238",
      },
      backgroundImage: {
        home: "url('/assets/banner/bg-home-banner.jpeg')",
        hotel: "url('/assets/banner/bg-hotel-banner.jpg')",
        tour: "url('/assets/banner/bg-tour-banner.jpg')",
        guide: "url('/assets/banner/bg-guide-banner.jpg')",
        about: "url('/assets/banner/bg-about-banner.jpeg')",
        contact: "url('/assets/banner/bg-contact-banner.jpeg')",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
});
