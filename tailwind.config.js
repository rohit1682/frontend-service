/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        heartbeat: "heartbeat 1s ease-in-out infinite",
      },
      keyframes: {
        heartbeat: {
          "0%": { transform: "scale(1)" },
          "15%": { transform: "scale(1.5)" },
          "30%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.5)" },
          "60%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
