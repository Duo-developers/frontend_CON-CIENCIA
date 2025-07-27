/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#3b82f6',
        'secondary-green': '#22c55e',
        'tertiary-sky': '#0ea5e9',
        'dark-bg': '#111827',
        'light-bg': '#ffffff',
        'surface': '#f9fafb',
        'dark-text': '#1f2937',
        'medium-text': '#4b5563',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
  // Optimize for production
  corePlugins: {
    // Disable unused features to reduce bundle size
    preflight: true,
  },
}
