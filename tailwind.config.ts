import type { Config } from "tailwindcss";
import Colors from "./app/config/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundDarkBlue: Colors.backgroundDarkBlue,
        backgroundLighBlue: Colors.backgroundLighBlue,
      },
    },
  },
  plugins: [],
};
export default config;
