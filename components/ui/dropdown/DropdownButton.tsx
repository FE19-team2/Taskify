import { FC } from 'react';
import { cn } from '@/lib/utils/twmerge';
import { Icon, IconName } from '../Icons/Icon';
interface DropdownButtonProps {
  label: string;
  IconName?: IconName;
  isopen?: boolean;
  onClick: () => void;
}

const DropdownButton: FC<DropdownButtonProps> = ({ label, IconName, isopen = false, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
<<<<<<< HEAD
      aria-expanded={isopen === true}
=======
      aria-expanded={state === 'focused'}
>>>>>>> 2f163c6 (refacor: 리뷰반영 수정(#65))
      className={cn(
        'w-full flex justify-between items-center px-4 py-2 rounded-md transition',
        isopen === false && 'bg-transparent text-gray-200 hover:bg-gray-700',
        isopen === true && 'bg-gray-700 text-gray-100 ring-2 ring-gray-500',
      )}
    >
      <span>{label}</span>
      {IconName && (
        <Icon
          name={IconName}
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isopen === true ? 'rotate-180' : '',
          )}
        />
      )}
    </button>
  );
};

export default DropdownButton;
