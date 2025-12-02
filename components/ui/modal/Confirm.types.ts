import { ModalProps } from './Modal.types';

export type ConfirmModalProps = ModalProps & {
  title: string;
  confirmText?: string;
  cancelText?: string;
  placeholder?: string;
  hasColorBoard?: boolean;
  onChange: (value: string) => void;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
};
