/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      colors: {
        cyberpunk: {
          dark: "#010117",
          darker: "#0a0e27",
          darkest: "#050812",

          blue: "#00F5FF",
          blue2: "#0891b2",
          cyan: "#06b6d4",
          
          purple: "#8B5CF6",
          purple2: "#6d28d9",
          violet: "#7c3aed",
          
          pink: "#EC4899",
          rose: "#f43f5e",
          
          green: "#00ff41",
          lime: "#a3e635",

          glass: "rgba(255,255,255,0.08)",
          glass2: "rgba(255,255,255,0.05)",

          text: "#FFFFFF",
          secondary: "#94A3B8",
          tertiary: "#64748b",
        },
      },

      backdropBlur: {
        glass: "14px",
        thick: "20px",
      },

      boxShadow: {
        neon: "0 0 30px rgba(0,245,255,0.6), 0 0 60px rgba(0,245,255,0.3)",
        "neon-strong": "0 0 50px rgba(0,245,255,0.8), 0 0 100px rgba(0,245,255,0.4)",
        "neon-pink": "0 0 30px rgba(236,72,153,0.6), 0 0 60px rgba(236,72,153,0.3)",
        "neon-purple": "0 0 30px rgba(139,92,246,0.6), 0 0 60px rgba(139,92,246,0.3)",
        "neon-green": "0 0 30px rgba(0,255,65,0.6), 0 0 60px rgba(0,255,65,0.3)",
        glass: "0 8px 32px rgba(31,38,135,0.37)",
        "glass-xl": "0 20px 60px rgba(31,38,135,0.5)",
      },

      keyframes: {
        glow: {
          "0%, 100%": {
            boxShadow:
              "0 0 30px rgba(0,245,255,0.6), 0 0 60px rgba(0,245,255,0.3)",
          },

          "50%": {
            boxShadow:
              "0 0 50px rgba(0,245,255,0.8), 0 0 80px rgba(0,245,255,0.4)",
          },
        },

        "glow-pink": {
          "0%, 100%": {
            boxShadow: "0 0 30px rgba(236,72,153,0.6)",
          },
          "50%": {
            boxShadow: "0 0 50px rgba(236,72,153,0.8)",
          },
        },

        "glow-purple": {
          "0%, 100%": {
            boxShadow: "0 0 30px rgba(139,92,246,0.6)",
          },
          "50%": {
            boxShadow: "0 0 50px rgba(139,92,246,0.8)",
          },
        },

        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.8",
          },
        },

        "pulse-slow": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },

        "float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },

        "float-slow": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-30px)",
          },
        },

        "shimmer": {
          "0%": {
            backgroundPosition: "-1000px 0",
          },
          "100%": {
            backgroundPosition: "1000px 0",
          },
        },

        "slide-in-right": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },

        "slide-in-left": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },

        "spin-slow": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },

        "gradient-shift": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },

        "fire-flicker": {
          "0%, 100%": {
            textShadow: "0 0 10px #ff6b00, 0 0 20px #ff3300",
          },
          "50%": {
            textShadow: "0 0 20px #ffaa00, 0 0 40px #ff6600",
          },
        },
      },

      animation: {
        glow: "glow 2s ease-in-out infinite",
        "glow-pink": "glow-pink 2s ease-in-out infinite",
        "glow-purple": "glow-purple 2s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "float-slow": "float-slow 4s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "spin-slow": "spin-slow 20s linear infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "fire-flicker": "fire-flicker 1.5s ease-in-out infinite",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },

  plugins: [],
}