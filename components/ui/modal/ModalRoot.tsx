'use client';

import { useEffect } from 'react';
import type { ModalProps } from './Modal.types';
import clsx from 'clsx';

const MODAL_WRAPPER_CLASS = 'fixed inset-0 flex items-center justify-center';

function getBaseWidthBySize(size: ModalProps['size'] = 'md') {
  switch (size) {
    case 'sm':
      return 'w-[335px]';
    case 'md':
      return 'w-[600px]';
    case 'lg':
      return 'w-[644px]';
    case 'xl':
      return 'w-[874px]';
    default:
      return 'w-[600px]';
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

  if (!open) return null;

  const widthClass = getBaseWidthBySize(size);

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-[1px]" onClick={() => {}}></div>
      <div
        className=""
        onClick={() => {
          if (closeOnOutside) onOpenChange(false);
        }}
      >
        <div
          className={MODAL_WRAPPER_CLASS}
          onClick={() => {
            if (closeOnOutside) onOpenChange(false);
          }}
        >
          <div
            className={clsx(
              widthClass,
              'max-h-[80vh] h-auto mx-auto my-auto rounded-3xl overflow-hidden',
              className,
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="max-h-[inherit] overflow-auto">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
