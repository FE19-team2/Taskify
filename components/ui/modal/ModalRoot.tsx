'use client';

import { useEffect } from 'react';
import type { ModalProps } from './Modal.types';
import clsx from 'clsx';

const MODAL_WRAPPER_CLASS = 'fixed inset-0 flex items-center justify-center z-50';

function getBaseWidthBySize(size: ModalProps['size']) {
  switch (size) {
    case 'sm':
      return 'w-[307px] md:w-[458px]';
    case 'md':
      return 'w-[335px] md:w-[600px]';
    case 'lg':
      return 'w-[375px] md:w-[600px]';
    case 'xl':
      return 'w-[375px] md:w-[644px] lg:w-[874px]';
    default:
      return 'w-[335px] md:w-[600px]';
  }
}

export function ModalRoot({
  open,
  onOpenChange,

  closeOnEsc = true,
  closeOnOutside = true,
  size = 'md',
  className,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, closeOnEsc, onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  const widthClass = getBaseWidthBySize(size);

  return (
    <div
      className={MODAL_WRAPPER_CLASS}
      onClick={() => {
        if (closeOnOutside) onOpenChange(false);
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
      <div
        className={clsx(
          'relative',
          widthClass,
          'max-h-[80vh] h-auto rounded-3xl overflow-hidden bg-bg-model',
          className,
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="max-h-[inherit] overflow-auto" role="dialog" aria-modal="true">
          {children}
        </div>
      </div>
    </div>
  );
}
