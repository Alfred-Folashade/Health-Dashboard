/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'urbanist': ['Urbanist', 'sans-serif'],
      },
      colors: {
        'primary-blue': {
          DEFAULT: 'rgb(146, 179, 202)',
          35: 'rgba(146, 179, 202, 0.35)',
          20: 'rgba(146, 179, 202, 0.2)',
          10: 'rgba(146, 179, 202, 0.1)',
          50: 'rgba(146, 179, 202, 0.5)',
        },
        'primary-orange': 'rgb(243, 195, 177)',
        'main-text': 'rgb(0, 43, 49)',
        'error-red': 'rgb(208, 69, 82)',
      },
      animation: {
        'spinner': 'spinner 1.5s linear infinite',
        'spinner-delayed': 'spinner 1.5s linear infinite 0.75s',
        'chat': 'chat 0.4s ease-out',
      },
      keyframes: {
        spinner: {
          '0%': {
            transform: 'scale(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '0',
          },
        },
        chat: {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
      duration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
