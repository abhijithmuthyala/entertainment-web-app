import { HORIZONTAL_SCROLL_UNITS } from "./src/constants";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        "scale-in": "scale-in 600ms ease-in-out",
        "slide-up": "slide-up 400ms ease-in-out",
      },
      fontFamily: {
        outfit: "var(--ff-outfit)",
      },
      fontWeight: {
        normal: 300,
        bold: 500,
      },
      fontSize: {
        xs: "var(--fs-xs)",
        sm: "var(--fs-sm)",
        base: "var(--fs-base)",
        md: "var(--fs-md)",
        lg: "var(--fs-lg)",
        xl: "var(--fs-xl)",
        "2xl": "var(--fs-2xl)",
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
        normal: "normal",
        tight: "var(--ls-sm)", // -0.312px
        tighter: "var(--ls-xs)", // -0.5px
      },
      borderRadius: {
        xs: "0.125rem", // 2px
        sm: "0.25rem", // 4px
        md: "0.375rem", // 6px
        lg: "0.5rem", // 8px
        "3xl": "1.5rem", // 20px
        full: "50%",
      },
      backgroundImage: {
        avatar: "url('/image-avatar.png')",
        "bookmark-empty": "url('/icon-bookmark-empty.svg')",
        "bookmark-full": "url('/icon-bookmark-full.svg')",
        search: "url(/icon-nav-search.svg)",
      },
      minHeight: {
        "header-mobile": "var(--header-height)",
        "header-desktop": "var(--header-height-desktop)",
      },
      borderWidth: {
        1: "1px",
      },
      gridTemplateColumns: {
        "scroll-mobile": `repeat(${HORIZONTAL_SCROLL_UNITS},15rem)`,
        "scroll-desktop": `repeat(${HORIZONTAL_SCROLL_UNITS},29.375rem)`,
      },
      aspectRatio: {
        "media-overlay-mobile": "240/140",
        "media-overlay-desktop": "470/230",
        "media-mobile": "164/110",
        "media-desktop": "280/174",
      },
    },
  },
  plugins: [],
};

export default config;
