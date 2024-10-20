import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0b5179",
        "primary-dk": "#0b5179",
        "primary-lt": "#a397e1",
        secondary: "#A7165C",
        "secondary-dk": "#b60c64",
        successful: "#258635",
        "successful-dk": "#218838",
        white: "#fff",
        light: "#f5f5f5",
        flash: "#e1e1e1",
        gray: "#a1a1a1",
        dark: "#999",
        darkness: "#444",
        black: "#111",
        "primary-price": "#c52c29",
        "primary-title": "#19124f",
        "pr-color-brand": "#0b5179",
        "pr-color-primary": "#0b5179",
        "pr-color-primary-300": "#a397e1",
        "pr-color-secondary": "#A7165C",
        "pr-color-secondary-500": "#b60c64",
        "pr-color-secondary-700": "#c50008",
        "pr-color-dodgerblue": "#2792ce",
        "pr-color-darkslateblue": "#04497d",
        "pr-color-checkout": "#A7165C",
        "pr-color-checkout-hover": "#b60c64",
        "pr-color-addtocart": "#A7165C",
        "pr-color-addtocart-hover": "#b60c64",
        "pr-color-neutral-100": "#e1e1e1",
        "pr-color-neutral-200": "#D6DADF",
        "pr-color-neutral-900": "#07002f",
        "pr-color-success-100": "#ccf7d4",
        "pr-color-success-200": "#5bbb6b",
        "pr-color-success-500": "#258635",
        "pr-color-information-100": "#e7e4f7",
        "pr-color-information-300": "#A397E1",
        "pr-color-information-500": "#6551CC",
        "pr-color-information-600": "#5441b5",
        "pr-color-warning-200": "#fdebd2",
        "pr-color-warning-600": "#ffa800",
        "pr-color-warning-700": "#d89205",
        "pr-color-error-300": "#fe7c7c",
        lama: "#F35C7A",
        cusgray: {
          DEFAULT: "#F2F5F6",
        },
        cusblack: {
          DEFAULT: "#383838",
        },
      },
      animation: {
        gradient: "gradient 10s ease infinite",
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
