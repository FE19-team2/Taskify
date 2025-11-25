import { FC } from 'react';
import { cn } from '@/lib/utils/twmerge';
import { Icon, IconName } from '../Icons/Icon';
interface DropdownButtonProps {
  label: string;
  IconName?: IconName;
  state?: 'focused' | 'unfocused';
  onClick: () => void;
}

const DropdownButton: FC<DropdownButtonProps> = ({
  label,
  IconName,
  state = 'unfocused',
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex justify-between items-center px-4 py-2 rounded-md transition',
        state === 'unfocused' && 'bg-transparent text-gray-200 hover:bg-gray-700',
        state === 'focused' && 'bg-gray-700 text-gray-100 ring-2 ring-gray-500',
      )}
    >
      <span>{label}</span>
      {IconName && (
        <Icon
          name={IconName}
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            state === 'focused' ? 'rotate-180' : '',
          )}
        />
      )}
    </button>
  );
};

export default DropdownButton;
