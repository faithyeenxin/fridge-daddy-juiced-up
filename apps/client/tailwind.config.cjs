/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        bgBeige: "#F9DCC4",
        bgPeach: "#FFD4B7",
        bgSand: "#FEC89A",
        bgPink: "#fee9e7",
        bgBabyPink: "#FBD1DB",
        fontOrange: "#FF5C39",
        fontOrangeLight: "#FF8866",
        fontGreen: "#228B22",
        fontRed: "#FF0000",
        fontGray: "#708090",
        sadFace: "#e9622a",
        buttonBrightGreen: "#c2f970",
        buttonLightGreen: "#c9f29b",
        iconFadedGreen: "#c9f29b",
        avatarOrangeBg: "#fde3a7",
        avatarOrangeFont: "#f9690e",
        bgCard: "#fef1f0",
      },
      fontFamily: {
        lora: "'Lora', serif",
        mono: "'DM Mono', monospace",
        roboto: "'Roboto', sans-serif;",
      },
    },
  },
  plugins: [],
};
