import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#000000",

            primary: {
              500: "#c6a0f6",
              foreground: "#000000",
              DEFAULT: "#c6a0f6",
            },
          }
        },
        dark: {
          colors: {
            background: "#FFFFFF",
            foreground: "#cad3f5",

            primary: {
              500: "#c6a0f6",
              foreground: "#000000",
              DEFAULT: "#c6a0f6",
            },
          }
        },
      }
    }),
    require("@catppuccin/tailwindcss")({
      prefix: "ctp",
      defaultFlavour: "macchiato",
    })
  ],
};

export default config;
