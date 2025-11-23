import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/twmerge';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[100px] font-medium transition-colors select-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: `
          bg-brand-500 text-white
          hover:bg-brand-600 hover:text-gray-100 hover:cursor-pointer
          active:bg-brand-700 active:text-white
          disabled:bg-brand-800 disabled:text-brand-300 disabled:hover:bg-brand-800 disabled:hover:text-brand-300 
        `,

        secondary: `
          bg-gray-700 text-gray-100
          hover:bg-gray-600 hover:text-white hover:cursor-pointer
          active:bg-gray-500 active:text-white
          disabled:bg-gray-800 disabled:text-gray-500 disabled:hover:bg-gray-800 disabled:hover:text-gray-500
        `,

        ghost: `
          w-[280px] h-[58px] px-[14px] py-[16px] rounded-[12px] 
          text-gray-100 text-white
          hover:bg-black-300 hover:text-white hover:cursor-pointer
          active:bg-gray-800 active:text-gray-200
          disabled:text-gray-600 disabled:hover:bg-transparent disabled:hover:text-gray-600
        `,
        profile: `
          w-[110px] h-[44px] gap-[9px] hover:cursor-pointer
        `,
      },

      size: {
        lg: 'w-full h-[60px] gap-2 px-[30px] py-[6px] text-lg',
        md: 'w-full h-[50px] gap-2 px-[24px] text-md',
        sm: 'w-full h-[36px] gap-1 px-[12px] text-sm',
        xs: 'w-full  h-[29px] gap-[2px] px-[10px] text-xs',
        side: 'w-full h-[50px] pl-[12px] pr-[14px] py-[16px]',
      },

      full: {
        true: 'w-full',
        false: '',
      },

      color: {
        rose: `bg-profile-rose`,
        orange: `bg-profile-orange`,
        yellow: `bg-profile-yellow`,
        green: `bg-profile-green`,
        cobalt: `bg-profile-cobalt`,
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        color: 'rose',
        className: 'bg-profile-rose hover:bg-profile-rose active:bg-profile-rose',
      },
      {
        variant: 'primary',
        color: 'orange',
        className: 'bg-profile-orange hover:bg-profile-orange active:bg-profile-orange',
      },
      {
        variant: 'primary',
        color: 'yellow',
        className: 'bg-profile-yellow hover:bg-profile-yellow active:bg-profile-yellow',
      },
      {
        variant: 'primary',
        color: 'green',
        className: 'bg-profile-green hover:bg-profile-green active:bg-profile-green',
      },
      {
        variant: 'primary',
        color: 'cobalt',
        className: 'bg-profile-cobalt hover:bg-profile-cobalt active:bg-profile-cobalt',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      full: false,
    },
  },
);
