/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode using a class
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5', // Indigo 600
          dark: '#6366f1',  // Indigo 500
        },
        secondary: {
          light: '#10b981', // Emerald 500
          dark: '#34d399',  // Emerald 400
        },
        background: {
          light: '#f9fafb', // Gray 50
          dark: '#111827',  // Gray 900
        },
        foreground: {
          light: '#1f2937', // Gray 800
          dark: '#f9fafb',  // Gray 50
        },
        card: {
            light: '#ffffff',
            dark: '#1f2937', // Gray 800
        },
        border: {
            light: '#e5e7eb', // Gray 200
            dark: '#374151',  // Gray 700
        }
      }
    },
  },
  plugins: [],
}