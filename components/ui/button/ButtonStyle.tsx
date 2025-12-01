import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[100px] font-medium transition-colors select-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: `
          bg-brand-500 text-white
          hover:bg-brand-600 hover:text-gray-100 
          active:bg-brand-700 active:text-white
          disabled:bg-brand-800 disabled:text-brand-300  
        `,

        secondary: `
          bg-gray-700 text-gray-100
          hover:bg-gray-600 hover:text-white 
          active:bg-gray-500 active:text-white
          disabled:bg-gray-800 disabled:text-gray-500  
        `,

        ghost: `
            
          text-gray-100 text-white
          hover:bg-black-300 hover:text-white 
          active:bg-gray-800 active:text-gray-200
          disabled:text-gray-600  
        `,
      },

      size: {
        lg: 'h-[60px] gap-2 text-lg w-[327px] md:w-[520px]',
        md: 'h-[50px] gap-2 text-md w-[247px] md:w-[358px]',
        sm: 'h-[50px] gap-2 text-sm w-[141.5px] md:w-[260px]',
        xs: 'h-[36px] gap-2 text-xs w-[68px]',

        side: 'pl-[12px] pr-[14px] py-[16px] rounded-[12px]',
        profile: 'gap-[9px]',
      },

      full: {
        true: 'w-full y-full',
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
        className: 'bg-profile-rose hover:bg-profile-rose/90 active:bg-profile-rose/80',
      },
      {
        variant: 'primary',
        color: 'orange',
        className: 'bg-profile-orange hover:bg-profile-orange/90 active:bg-profile-orange/80',
      },
      {
        variant: 'primary',
        color: 'yellow',
        className: 'bg-profile-yellow hover:bg-profile-yellow/90 active:bg-profile-yellow/80',
      },
      {
        variant: 'primary',
        color: 'green',
        className: 'bg-profile-green hover:bg-profile-green/90 active:bg-profile-green/80',
      },
      {
        variant: 'primary',
        color: 'cobalt',
        className: 'bg-profile-cobalt hover:bg-profile-cobalt/90 active:bg-profile-cobalt/80',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      full: false,
    },
  },
);
