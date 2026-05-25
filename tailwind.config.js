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
        cream: "#F5F0E8",
        "cream-dark": "#EDE8DC",
        "forest-green": "#1A3D35",
        "forest-light": "#2D5E52",
        ink: "#1C1C1A",
        stone: "#6B6860",
        "glass-border": "rgba(200, 195, 185, 0.4)",
        "card-linen": "#F0EBE0",
        "card-sand": "#E8E2D4",
        "card-stone": "#DFD9CC",
        "card-taupe": "#D6D0C3",
      },
      fontFamily: {
        geist: ["Geist", "Inter", "sans-serif"],
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
