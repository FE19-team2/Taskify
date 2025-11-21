import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // 폰트 설정 확장
      fontFamily: {
        // Pretendard 기본 적용
        pretendard: 'var(--font-pretendard)',
      },

      // 색상 설정 확장
      colors: {
        // Background Color Group
        'bg-primary': 'var(--color-bg-primary)',
        'bg-model': 'var(--color-bg-model)',
        'bg-stroke': 'var(--color-bg-stroke)',

        // Black Tones
        'black-100': 'var(--color-black-100)',
        'black-200': 'var(--color-black-200)',
        'black-300': 'var(--color-black-300)',
        'black-400': 'var(--color-black-400)',
        'black-500': 'var(--color-black-500)',
        'black-600': 'var(--color-black-600)',

        // Gray Tones
        'gray-100': 'var(--color-gray-100)',
        'gray-200': 'var(--color-gray-200)',
        'gray-300': 'var(--color-gray-300)',
        'gray-400': 'var(--color-gray-400)',
        'gray-500': 'var(--color-gray-500)',
        'gray-600': 'var(--color-gray-600)',
        'gray-700': 'var(--color-gray-700)',

        // BRAND COLORS (Green) - 'brand-green' 네임스페이스 사용
        'brand-green': {
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
          950: 'var(--color-brand-950)',
        },

        // SYSTEM & BASE COLORS
        white: 'var(--color-white)',

        // Red Shades
        'red-a': 'var(--color-red-A)',

        // Blue Shades
        'blue-a': 'var(--color-blue-A)',
        'blue-b': 'var(--color-blue-B)',

        // PROFILE RANDOM COLORS - 'profile' 네임스페이스 사용
        profile: {
          green: 'var(--color-profile-green)',
          violet: 'var(--color-profile-violet)',
          cyan: 'var(--color-profile-cyan)',
          rose: 'var(--color-profile-rose)',
          cobalt: 'var(--color-profile-cobalt)',
          yellow: 'var(--color-profile-yellow)',
          orange: 'var(--color-profile-orange)',
        },
      },

      // Typography Class는 @layer base를 사용하여 이미 정의했으므로, 여기에서는 제외합니다.
    },
  },
  plugins: [],
};

export default config;
