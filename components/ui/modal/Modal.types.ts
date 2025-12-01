export type ModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  closeOnEsc?: boolean;
  closeOnOutside?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: React.ReactNode;
};
