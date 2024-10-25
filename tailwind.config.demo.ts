import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "primary-dk": "#0b5179",
        "primary-lt": "#a397e1",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "secondary-dk": "#b60c64",
        successful: "#258635",
        "successful-dk": "#218838",
        white: "#fff",
        light: "#f5f5f5",
        flash: "#e1e1e1",
        gray: "#a1a1a1",
        "light-gray": "#f5f5f5",
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
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        cusblack: {
          DEFAULT: "#383838",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      animation: {
        gradient: "gradient 10s ease infinite",
      },
      keyframes: {
        gradient: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
