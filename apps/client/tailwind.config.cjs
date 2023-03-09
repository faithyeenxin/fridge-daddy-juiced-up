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
        bgColor: "#FEE9E7",
        sand: "#FFF6F1",
        beige: "#FFD6C0",
        mutedPink: "#FEC5B9",
        tablePink: "#FFE3DD",
        tableOffWhite: "#FFF6F1",
        extraMutedPink: "#FED8CF",
        offWhite: "#FFF6F1",
        orange: "#FF5C39",
        pink: "#FD3379",
        orangeLight: "#FF5C39",
        blueGray: "#445765"
        // bgBeige: "#F9DCC4",
        // bgPeach: "#FFD4B7",
        // bgSand: "#FEC89A",
        // bgBabyPink: "#FBD1DB",
        // fontOrangeLight: "#FF8866",
        // fontGreen: "#228B22",
        // fontRed: "#FF0000",
        // fontGray: "#708090",
        // sadFace: "#e9622a",
        // buttonBrightGreen: "#c2f970",
        // buttonLightGreen: "#c9f29b",
        // iconFadedGreen: "#c9f29b",
        // avatarOrangeBg: "#fde3a7",
        // avatarOrangeFont: "#f9690e",
        // bgCard: "#fef1f0",
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
