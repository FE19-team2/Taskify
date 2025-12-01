import Button from '@/components/ui/button/Button';
import clsx from 'clsx';

type ModalButtonsProps = {
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDelete?: boolean;
};

export function ModalButtons({
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isDelete = false,
}: ModalButtonsProps) {
  return (
    <div className="flex justify-between">
      <Button
        size="sm"
        className="md:h-[60px] bg-gray-700 text-[18px] hover:bg-gray-600"
        onClick={onCancel}
      >
        {cancelText}
      </Button>
      <Button
        size="sm"
        className={clsx('md:h-[60px] text-[18px]', isDelete && 'bg-red-600 hover:bg-red-500')}
        onClick={onConfirm}
      >
        {confirmText}
      </Button>
    </div>
  );
}
