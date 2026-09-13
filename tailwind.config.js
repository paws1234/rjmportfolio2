const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono]
      },
      transitionTimingFunction: {
        // One easing curve, used everywhere, so every transition feels like it
        // belongs to the same product. `spring` overshoots slightly for
        // entrances, `swift` is the flat curve for hover feedback.
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
        swift: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      keyframes: {
        aurora: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%,-4%,0) scale(1.12)" },
          "66%": { transform: "translate3d(-5%,5%,0) scale(0.94)" }
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        },
        shine: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" }
        },
        rise: {
          from: { opacity: "0", transform: "translate3d(0,14px,0)" },
          to: { opacity: "1", transform: "none" }
        },
        popIn: {
          from: { opacity: "0", transform: "scale(0.94) translateY(10px)" },
          to: { opacity: "1", transform: "none" }
        },
        haloPulse: {
          "0%": { opacity: "0.55", transform: "scale(0.85)" },
          "70%,100%": { opacity: "0", transform: "scale(2.1)" }
        },
        caret: {
          "0%,45%": { opacity: "1" },
          "50%,100%": { opacity: "0" }
        },
        drift: {
          from: { backgroundPosition: "0% 50%" },
          to: { backgroundPosition: "200% 50%" }
        },
        bounceDot: {
          "0%,80%,100%": { transform: "translateY(0)", opacity: "0.45" },
          "40%": { transform: "translateY(-4px)", opacity: "1" }
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" }
        }
      },
      animation: {
        aurora: "aurora 22s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        shine: "shine 1.1s cubic-bezier(0.4, 0, 0.2, 1)",
        rise: "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pop-in": "popIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) both",
        halo: "haloPulse 2.6s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        caret: "caret 1.05s step-end infinite",
        drift: "drift 8s linear infinite",
        "bounce-dot": "bounceDot 1.15s ease-in-out infinite",
        "spin-slow": "spinSlow 14s linear infinite"
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgb(0 0 0 / 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.045) 1px, transparent 1px)",
        "grid-fade-dark":
          "linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
