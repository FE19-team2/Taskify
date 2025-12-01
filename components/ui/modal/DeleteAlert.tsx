import { ModalRoot } from './ModalRoot';
import { ModalButtons } from './components/ModalButtons';

type DeleteAlertProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
  isDelete?: boolean;
};

export function DeleteAlert({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  isDelete = false,
  isLoading = false,
}: DeleteAlertProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleConfirm = async () => {
    if (isLoading) return;

    await onConfirm();
    onOpenChange(false);
  };

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange} size="md" closeOnOutside={false}>
      <div className="flex flex-col pt-[30px] px-5 pb-6 text-[#D6D5D9] md:p-[30px] md:pt-10">
        <h2 className="text-center text-[18px] md:text-[24px] font-semibold mb-2 md:mb-3">
          {title}
        </h2>
        <p className="text-center text-[16px] mb-6 md:mb-8 md:text-[20px]">{description}</p>
        <ModalButtons
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handleConfirm}
          onCancel={handleClose}
          isDelete={isDelete}
        />
      </div>
    </ModalRoot>
  );
}
