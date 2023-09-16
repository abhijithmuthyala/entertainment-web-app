/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      outfit: "var(--ff-outfit)",
    },
    fontWeight: {
      normal: 300,
      bold: 500,
    },
    fontSize: {
      sm: "var(--fs-sm)",
      base: "var(--fs-base)",
      md: "var(--fs-md)",
      lg: "var(--fs-lg)",
      xl: "var(--fs-xl)",
    },
    colors: {
      highlight: "var(--highlight)",
      primary: "var(--primary)",
      background: {
        intense: "var(--background-intense)",
        muted: "var(--background-muted)",
      },
      red: {
        900: "var(--red-900)",
      },
      blue: {
        300: "var(--blue-300)",
        700: "var(--blue-700)",
        900: "var(--blue-900)",
      },
      gray: {
        100: "var(--gray-100)",
      },
    },
    opacity: {
      50: "0.5",
      75: "0.75",
      100: "1",
    },
    letterSpacing: {
      tight: "-0.03125em", // -0.5px
    },
    backgroundImage: {
      avatar: "url('/image-avatar.png')",
      search: "url('/icon-search.svg')",
    },
    borderRadius: {
      xs: "0.125rem", // 2px
      sm: "0.25rem", // 4px
      md: "0.375rem", // 6px
      lg: "0.5rem", // 8px
      full: "50%",
    },
    extend: {
      minHeight: {
        header: "var(--header-height)",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
