import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva('transition-colors duration-200 ease-in-out ', {
  variants: {
    variant: {
      primary: ` 
          bg-black-400 border-gray-700 px-5 py-1.5 border-[1px] text-gray-300 outline-none rounded-[14px]
          active:bg-black-400 active:text-gray-100 active:border-[1.5px] active:border-blue-B
          disabled:bg-gray-900 disabled:border disabled:border-[1px] disabled:text-gray-500
          focus:bg-black-400 focus:text-gray-100 focus:border-[1.5px] focus:border-blue-B
        `,
      secondary: `
          bg-black-400 border border-gray-700 outline-none
          active:bg-transparent active:border active:border-blue-B active:rounded-[14px]
          disabled:bg-gray-900 disabled:rounded-[14px] disabled:text-gray-400
          focus:bg-black-400 focus:text-gray-100 focus:border-[1.5px] focus:border-blue-B
        `,

      comment: `
          bg-transparent w-full h-[39px] px-[20px] py-[10px] border border-gray-400 rounded-[100px] outline-none overflow-hidden
          active:w-[584px] active:rounded-[14px] active:border-[1.5px] active:border-blue-B active:text-white
          active:overflow-y-auto
          focus:bg-transparent focus:w-[584px] focus:min-h-[120px] focus:px-[20px] focus:py-[20px] focus:rounded-[14px] focus:outline-none
          focus:border-[1.5px] focus:border-blue-B focus:rounded-[14px] focus:text-gray-400 focus:overflow-y-auto  
        `,
    },

    size: {
      sm: `
    w-[327px] h-[54px]
    md:w-[520px] md:h-[54px]
  `,

      md: `
    w-[295px] h-[48px]
    md:w-[540px] md:h-[54px]
  `,

      lg: `
    w-[335px] h-[48px]
    md:w-[540px] md:h-[54px]
  `,

      xl: `
    w-[335px] h-[48px]
    md:w-[446px] md:h-[54px]
    lg:w-[740px] lg:h-[54px]
  `,
    },

    status: {
      default: '',
      completed: '',
      error: '',
      typing: '',
      full: '',
    },
  },

  compoundVariants: [
    // --- Search Theme Status ---

    {
      variant: 'primary',
      status: 'completed',
      class: 'bg-black-400 text-gray-300 border border-gray-700',
    },
    {
      variant: 'primary',
      status: 'error',
      class: 'bg-black-400 border border-red-A',
    },

    // --- Comment Theme Status ---
    {
      variant: 'comment',
      status: 'typing',
      class: 'border-[1.5px]  text-gray-400 rounded-[14px] ',
    },
    {
      variant: 'comment',
      status: 'full',
      class: 'w-[584px] h-[220px]  rounded-[14px] border-[1.5px] text-white overflow',
    },
    {
      variant: 'comment',
      status: 'completed',
      class: 'border border-gray-400 text-gray-400 ',
    },
  ],

  defaultVariants: {
    status: 'default',
  },
});

export type InputVariantsProps = VariantProps<typeof inputVariants>;
