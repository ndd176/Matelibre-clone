import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // quét toàn bộ src để áp dụng Tailwind
  ],
  theme: {
    extend: {
      maxWidth: {
      'screen-2xl': '1920px',
    },
      colors: {
        primary: '#F0F0F0',
        accent: '#00FFB2',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        'plus-jakarta-sans': ['var(--font-plus-jakarta-sans)', 'sans-serif'],
        'sans': ['var(--font-plus-jakarta-sans)', 'sans-serif'], // Set làm font mặc định
        'bebas': ['var(--font-bebas)', 'sans-serif'], // Font Bebas Neue
        // Backward compatibility
        'studio-pro': ['var(--font-plus-jakarta-sans)', 'sans-serif'],
        'studio-pro-bold': ['var(--font-plus-jakarta-sans)', 'sans-serif'],
      },
      animation: {
        fade: 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
export default config
