/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050608',
        gold: '#f7c948',
        blueglow: '#53c9ff',
        panel: 'rgba(10, 12, 18, 0.72)'
      },
      boxShadow: {
        glow: '0 0 30px rgba(247, 201, 72, 0.28), 0 0 60px rgba(83, 201, 255, 0.16)'
      },
      backgroundImage: {
        stadium:
          'radial-gradient(circle at top, rgba(83, 201, 255, 0.22), transparent 35%), radial-gradient(circle at 80% 10%, rgba(247, 201, 72, 0.22), transparent 22%), linear-gradient(180deg, #050608 0%, #090d14 60%, #040507 100%)'
      }
    }
  },
  plugins: []
};
