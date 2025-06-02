// Front-end/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4AF37', // Oro elegante come colore primario (era rosso)
          50: '#FFFBEB',
          100: '#FFF7D6',
          200: '#FFEFAD',
          300: '#FFE785',
          400: '#FFDF5C',
          500: '#D4AF37', // Base
          600: '#B8941E',
          700: '#9C7A05',
          800: '#856E00',
          900: '#5C4D00',
          950: '#332B00',
        },
        secondary: {
          DEFAULT: '#0A0A0A', // Nero più profondo e intenso
          50: '#F2F2F2',
          100: '#E6E6E6',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#262626',
          900: '#121212',
          950: '#0A0A0A', // Base più scura
        },
        accent: {
          DEFAULT: '#C10510', // Rosso come accento (era oro)
          50: '#FFE5E7',
          100: '#FFCCD0',
          200: '#FF9AA1',
          300: '#FF6773',
          400: '#FF3544',
          500: '#E30613', // Base
          600: '#C10510',
          700: '#9F040D',
          800: '#7D030A',
          900: '#5B0207',
          950: '#3A0105',
        },
        luxury: {
          DEFAULT: '#1E1E1E', // Nero elegante
          50: '#F8F8F8',
          100: '#F1F1F1',
          200: '#E2E2E2',
          300: '#CBCBCB',
          400: '#949494',
          500: '#646464',
          600: '#474747',
          700: '#333333',
          800: '#1E1E1E',
          900: '#0F0F0F',
          950: '#020202',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['Roboto Mono', 'monospace'],
        display: ['Montserrat', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/images/hero-bg.jpg')",
        'texture': "url('/src/assets/images/texture.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'zoom-in': 'zoomIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'elegant': '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};