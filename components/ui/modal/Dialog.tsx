import { ModalRoot } from './ModalRoot';
import type { ModalProps } from './Modal.types';
import Button from '@/components/ui/button/Button';

export function DialogModal({
  open,
  onOpenChange,
  description,
  onClose,
}: ModalProps & { description?: string; onClose?: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <ModalRoot open={open} onOpenChange={onOpenChange} size="sm">
      <div className="p-[30px] md:p-[50px]">
        <p className="text-center mb-5 md:mb-[30px] text-[16px] md:text-[20px] font-semibold">
          {description}
        </p>
        <Button
          className="md:h-[60px]"
          onClick={() => {
            onOpenChange(false);
            if (onClose) {
              onClose(false);
            }
          }}
        >
          확인
        </Button>
      </div>
    </ModalRoot>
  );
}
