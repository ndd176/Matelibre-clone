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
        'studio-pro': ['var(--font-studio-pro-regular)', 'sans-serif'],
        'studio-pro-bold': ['var(--font-studio-pro-bold)', 'sans-serif'],
        'sans': ['var(--font-studio-pro-regular)', 'sans-serif'], // Set làm font mặc định
         'bebas': ['var(--font-bebas)', 'sans-serif'], // Thêm dòng này

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
