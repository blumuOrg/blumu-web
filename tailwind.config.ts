import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * BLUMU brand tokens (aligned with blumu-app/src/theme/colors.ts / Figma).
 */
const config: Config = {
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        blumu: {
          primary: "#E85002",
          black: "#000000",
          white: "#FFFFFF",
          "almost-white": "#F5F5F5",
          "grey-darker": "#1E1E1E",
          "grey-dark": "#646464",
          "grey-middle": "#989796",
          "grey-light": "#C4C4C4",
          error: "#FF3B30",
          success: "#34C759",
          warning: "#FF9500",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
    },
  },
};

export default config;
