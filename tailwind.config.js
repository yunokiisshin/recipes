/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF8',
          100: '#FAF9F6',
          200: '#F4F1EB',
          300: '#EBE5D8',
        },
        amber: {
          warm: '#C2853A',
          light: '#E8A950',
          muted: '#8B5E27',
        },
        brown: {
          DEFAULT: '#2C2015',
          soft: '#5C4A32',
          muted: '#8A7260',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
