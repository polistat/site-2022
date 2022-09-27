module.exports = {
  darkMode: 'media', // bool or 'media' (system setting) or 'class' (toggle manually)
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        theme: {
          primary: "#1b6ce5",
          primaryVariant: "",
          secondary: "#ef3d3d",
          secondaryVariant: "",
          background: "#ffffff",
          surface: "#ffffff",
          // error: "",
          onPrimary: "#ffffff",
          onSecondary: "#ffffff",
          onBackground: "#000000",
          onSurface: "#000000",
          // onError: ""
        }
      }
    }
  },
  plugins: [],
}
