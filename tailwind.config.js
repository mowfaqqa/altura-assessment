/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        action: {
          active: "rgba(0, 0, 0, 0.54)",
          hover: "rgba(0, 0, 0, 0.04)",
          hoverOpacity: 0.04,
          selected: "#D99BFF",
          selectedOpacity: 0.08,
          disabled: "#CBCDCF",
          disabledBackground: "rgba(0, 0, 0, 0.12)",
          disabledOpacity: 0.38,
          focus: "rgba(0, 0, 0, 0.12)",
          focusOpacity: 0.12,
          activatedOpacity: 0.12,
          backdrop: "rgba(52, 64, 84, 0.6)",
          backdropFilter: "blur(16px)",
        },
      },
    },
  },
  plugins: [],
};
