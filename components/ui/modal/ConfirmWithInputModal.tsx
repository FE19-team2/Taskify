'use client';

import { ModalRoot } from './ModalRoot';
import { ConfirmModalProps } from './Confirm.types';
import { ModalHeader } from './components/Header';
import { ModalButtons } from './components/ModalButtons';
import { ModalInput } from './components/ModalInput';
import { ColorBoard } from './components/ColorBoard';

export function ConfirmWithInputModal({
  open,
  onOpenChange,
  title,
  placeholder = '',
  confirmText = '확인',
  cancelText = '취소',
  onChange,
  onConfirm,
  hasColorBoard = false,
  isLoading = false,
}: ConfirmModalProps) {
  const handleClose = () => {
    if (isLoading) return;
    onOpenChange(false);
  };

  const handleConfirm = async () => {
    if (isLoading) return;

    const onConfirmResult = onConfirm?.();

    if (onConfirmResult instanceof Promise) {
      try {
        await onConfirmResult;
        onOpenChange(false);
      } catch (err) {
        throw err;
      }
    } else {
      onOpenChange(false);
    }
  };

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange} size="md" closeOnOutside={false}>
      <div className="flex flex-col pt-6 p-5 text-[#D6D5D9] md:p-[30px]">
        <ModalHeader title={title} onClose={handleClose} />
        <ModalInput onChange={onChange} hasColorBoard={hasColorBoard} placeholder={placeholder} />
        {hasColorBoard && <ColorBoard />}
        <ModalButtons
          confirmText={confirmText}
          cancelText={cancelText}
          onConfirm={handleConfirm}
          onCancel={handleClose}
        />
      </div>
    </ModalRoot>
  );
}
