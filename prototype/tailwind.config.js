/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm Minimalist Magazine Palette
        canvas: '#FDFCF8', // Warm Paper
        terracotta: {
          DEFAULT: '#E86435', // Primary: Terracotta Orange
          hover: '#D55628',
          light: '#F2E8E3', // Hover background
        },
        text: {
          primary: '#2D2A26', // Warm Black
          secondary: '#8E8780', // Warm Gray
          muted: '#BDB8B4',
        },
        divider: '#EBE5E0',
        
        // Semantic Colors
        success: '#4A7A5E',
        warning: '#D9A346',
        error: '#C74E4E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif'], // For headings
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(45, 42, 38, 0.04)',
        'float': '0 12px 40px -8px rgba(45, 42, 38, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
