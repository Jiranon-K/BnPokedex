/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.scss"],
  theme: {
    extend: {
      screens: {
        ipad: "1024px",
      },
      colors: {
        
      },
      fontFamily: {
        atma: ["Atma", "cursive"],
        gaegu: ["Gaegu", "cursive"],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translate(-50%, -50%) rotate(0deg)' 
          },
          '50%': { 
            transform: 'translate(-50%, -50%) rotate(180deg)' 
          }
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.5)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        'xl': '0 6px 12px rgba(0, 0, 0, 0.5), 0 3px 6px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [
    require("daisyui"),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-xl': {
          textShadow: '0 6px 12px rgba(0, 0, 0, 0.5), 0 3px 6px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        }
      }
      addUtilities(newUtilities)
    }
  ],

  daisyui: {
    themes: [
      {
        pokemon: {

        },
      },
      "light",
      "dark",
    ],
    base: true,
    styled: true,
    utils: true,
  },
};
