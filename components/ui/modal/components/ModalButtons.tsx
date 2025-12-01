import Button from '@/components/ui/button/Button';

type ModalButtonsProps = {
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ModalButtons({ confirmText, cancelText, onConfirm, onCancel }: ModalButtonsProps) {
  return (
    <div className="flex justify-between">
      <Button size="sm" className="md:h-[60px] bg-gray-700 text-[18px]" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button size="sm" className="md:h-[60px] text-[18px]" onClick={onConfirm}>
        {confirmText}
      </Button>
    </div>
  );
}
