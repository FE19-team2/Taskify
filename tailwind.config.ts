import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      colors: {
        // Gray
        gray: {
          5: 'var(--color-gray-5)',
          10: 'var(--color-gray-10)',
          20: 'var(--color-gray-20)',
          30: 'var(--color-gray-30)',
          40: 'var(--color-gray-40)',
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        // Brand (Green)
        brand: {
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
        },
        // Black
        black: {
          secondary: 'var(--color-black-secondary)',
          primary: 'var(--color-black-primary)',
        },
        // Base & Status
        white: {
          DEFAULT: 'var(--color-white)',
          text: 'var(--color-white-text)',
        },
        red: {
          base: 'var(--color-red-base)',
        },
        blue: {
          base: 'var(--color-blue-base)',
          light: 'var(--color-blue-light)',
        },
        // Custom & Stroke
        stroke: {
          primary: 'var(--color-stroke-primary)',
        },
        // Profile
        profile: {
          green: 'var(--color-profile-green)',
          violet: 'var(--color-profile-violet)',
          cyan: 'var(--color-profile-cyan)',
          blue: 'var(--color-profile-blue)',
          cobalt: 'var(--color-profile-cobalt)',
          yellow: 'var(--color-profile-yellow)',
          orange: 'var(--color-profile-orange)',
        },
      },

      // =======================================
      // 2-2. Typography Tokens 통합
      // =======================================
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
      },

      lineHeight: {
        150: 'var(--line-height-150)',
        160: 'var(--line-height-160)',
      },

      fontWeight: {
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
    },
  },
  plugins: [],
};

export default config;
