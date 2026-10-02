/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#FAF7F2',
          200: '#F4ECE1',
          300: '#EADBC8',
          400: '#DEC6AC',
        },
        lavender: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
        },
        blush: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
        },
        mint: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
        },
        peach: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
        },
        night: {
          950: '#0C0A14',
          900: '#13111C',
          800: '#1A1726',
          700: '#242135',
          600: '#322E48',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(140, 110, 180, 0.08), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'soft': '0 4px 20px -2px rgba(140, 110, 180, 0.1), 0 2px 6px -1px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 30px -4px rgba(140, 110, 180, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'soft-xl': '0 20px 40px -6px rgba(140, 110, 180, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
        'glow-lavender': '0 0 25px -5px rgba(168, 85, 247, 0.35)',
        'glow-blush': '0 0 25px -5px rgba(244, 114, 182, 0.35)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
