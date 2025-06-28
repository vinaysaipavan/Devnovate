/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        textOne: "#1c1c1c",   // Dark Gray-Black for primary text
        textTwo: "#4d4d4d",   // Medium Gray for secondary text
      },
      backgroundColor: {
        bgOne: "#f0f0f0",     // Light Gray for main backgrounds
        bgTwo: "#e0e0e0",     // Slightly darker gray for secondary backgrounds
        bgThree: "#b3b3b3",   // Medium Gray for accents or cards
        bgFour: "#333333",    // Dark Gray for headers or footers
        bgFive: "#000000",    // Pure Black for high-contrast elements
      },
      animation: {
        scalePulse: "scalePulse 2s infinite ease-in-out",
      },
      keyframes: {
        scalePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
}

