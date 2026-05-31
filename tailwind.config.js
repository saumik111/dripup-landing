/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111318",
        "ink-soft": "#252832",
        "text-primary": "#171717",
        "text-secondary": "#4F5B6B",
        "text-muted": "#667386",
        surface: "#FFFFFF",
        "surface-soft": "#F8FAFF",
        outline: "#D6E0F2",
        "card-blue": "#D8E2FF",
        "card-mint": "#BDF0DC",
        "card-yellow": "#FFE066",
        "card-peach": "#FFB090",
        "card-black": "#111318",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        garamond: ["EB Garamond", "Georgia", "serif"],
      },
      fontSize: {
        h1: ["72px", { lineHeight: "1.05", fontWeight: "500" }],
        h2: ["48px", { lineHeight: "1.1", fontWeight: "500" }],
        h3: ["32px", { lineHeight: "1.2", fontWeight: "500" }],
        body: ["18px", { lineHeight: "1.6" }],
        caption: ["14px", { lineHeight: "1.5" }],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        "2xl": "64px",
        "3xl": "96px",
        section: "128px",
      },
      borderRadius: {
        tag: "4px",
        input: "8px",
        card: "16px",
        panel: "24px",
        btn: "99px",
      },
      maxWidth: {
        content: "1200px",
      },
      backdropBlur: {
        glass: "12px",
      },
    },
  },
  plugins: [],
};
