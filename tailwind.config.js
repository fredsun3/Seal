/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
    },
    extend: {
      colors: {
        // 主色调
        ink: {
          DEFAULT: "#1a1410",
          light: "#2a2018",
          deep: "#0d0a08",
        },
        paper: {
          DEFAULT: "#f4ecd8",
          light: "#faf4e6",
          dark: "#e8dcc0",
        },
        cinnabar: {
          DEFAULT: "#c8392e",
          dark: "#a02818",
          light: "#d94e3f",
        },
        bronze: {
          DEFAULT: "#b8893a",
          light: "#d4a44d",
          dark: "#8b6f2a",
        },
        patina: {
          DEFAULT: "#5a6b4a",
          light: "#7a8b5a",
          dark: "#3a4b2a",
        },
        rubbing: "#8b6f47",
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Songti SC"', '"SimSun"', "serif"],
        display: ['"ZCOOL XiaoWei"', '"Noto Serif SC"', "serif"],
        brush: ['"Ma Shan Zheng"', '"Noto Serif SC"', "serif"],
        happy: ['"ZCOOL KuaiLe"', '"Noto Serif SC"', "serif"],
        cang: ['"Long Cang"', '"Noto Serif SC"', "serif"],
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(circle at 20% 30%, rgba(184, 137, 58, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(200, 57, 46, 0.03) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(139, 111, 71, 0.02) 0%, transparent 70%)",
        "bronze-texture":
          "radial-gradient(circle at 30% 20%, rgba(184, 137, 58, 0.15) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(90, 107, 74, 0.12) 0%, transparent 40%), linear-gradient(135deg, #2a2018 0%, #1a1410 100%)",
        "ink-gradient":
          "linear-gradient(180deg, #0d0a08 0%, #1a1410 50%, #2a2018 100%)",
      },
      boxShadow: {
        seal: "0 2px 8px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(200, 57, 46, 0.2)",
        "seal-hover":
          "0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(200, 57, 46, 0.4)",
        bronze: "0 4px 16px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(184, 137, 58, 0.1)",
        paper: "0 2px 8px rgba(139, 111, 71, 0.15), inset 0 0 40px rgba(244, 236, 216, 0.5)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
        "shimmer": "shimmer 4s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(184, 137, 58, 0.4))" },
          "50%": { filter: "drop-shadow(0 0 16px rgba(184, 137, 58, 0.7))" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
