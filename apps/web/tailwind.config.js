/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        miku: {
          1: "hsl(var(--miku-1))",
          2: "hsl(var(--miku-2))",
          foreground: "hsl(var(--miku-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      minWidth: {
        lg: "32rem",
        xl: "40rem",
      },
      maxWidth: {
        "2xs": "16rem",
        "3xs": "12rem",
      },
      height: {
        57: "14.25rem",
      },
      boxShadow: {
        "t-inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05);",
        "b-inner": "inset 0 -2px 4px 0 rgb(0 0 0 / 0.05);",
        "inner-sm": "inset 0 1px 2px 0 rgb(0 0 0 / 0.05);",
        "inner-md":
          "inset 0 4px 6px -1px rgb(0 0 0 / 0.1), inset 0 2px 4px -1px rgb(0 0 0 / 0.06);",
        "inner-xl":
          "inset 0 20px 25px -5px rgb(0 0 0 / 0.1), inset 0 10px 10px -5px rgb(0 0 0 / 0.04);",
      },
      rounded: {
        md: "0.375rem;",
        lg: "0.5rem;",
      },
      keyframes: {
        formShow: {
          "0%": {
            opacity: 0,
            zIndex: 1,
          },
          "49.99%": {
            opacity: 0,
            zIndex: 1,
          },
          "50%": {
            opacity: 1,
            zIndex: 5,
          },
          "100%": {
            opacity: 1,
            zIndex: 5,
          },
        },
      },
      animation: {
        formShow: "formShow 0.6s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
