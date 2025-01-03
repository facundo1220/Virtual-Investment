/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        azerete: ["Azeret Mono", "sans-serif"],
      },
    },
    screens: {
      sm: "240px",

      md: "768px",

      lg: "1024px",
    },
    fontSize: {
      headline1: ["50px", { lineHeight: "60px", letterSpacing: "-0.02em" }],
      headline2: ["40px", { lineHeight: "48px", letterSpacing: "-0.02em" }],
      headline3: ["32px", { lineHeight: "38px", letterSpacing: "-0.02em" }],
      headline4: ["24px", { lineHeight: "28px", letterSpacing: "-0.02em" }],
      subtitle: ["18px", { lineHeight: "22px", letterSpacing: "-0.02em" }],
      paragraph: ["16px", { lineHeight: "19px", letterSpacing: "-0.02em" }],
      button: ["14px", { lineHeight: "17px", letterSpacing: "-0.02em" }],
      small: ["14px", { lineHeight: "18px", letterSpacing: "-0.02em" }],
      label: ["12px", { lineHeight: "15px", letterSpacing: "-0.02em" }],
    },
  },
  plugins: [],
};
