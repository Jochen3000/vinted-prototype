export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"San Francisco"',
          '"Inter"',
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        // Vinted brand palette
        teal: {
          DEFAULT: "#007782",
          50: "#e6f2f3",
          600: "#007782",
          700: "#006670",
        },
        vinted: {
          green: "#007782",
          greenDark: "#006670",
          bg: "#f6f6f6",
          text: "#171717",
        },
      },
    },
  },
  plugins: [],
};
