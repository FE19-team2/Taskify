'use client';

import { forwardRef, useState, useCallback, useRef } from 'react';
import { inputVariants, InputVariantsProps } from '@/components/ui/input/InputStyle';
import { cn } from '@/lib/utils/twmerge';
import Button from '@/components/ui/button/Button';

type BaseInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size' | 'onChange' | 'onBlur' | 'onFocus'
>;

export interface InputProps extends BaseInputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  variant?: InputVariantsProps['variant'];
  size?: InputVariantsProps['size'];
  status?: InputVariantsProps['status'];

  showCommentButtons?: boolean;
}

const TEXTAREA_THEMES = ['comment', 'textarea'] as const;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      status,
      onFocus,
      onBlur,
      showCommentButtons = false,
      ...props
    },
    externalRef,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const internalRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const setRefs = useCallback(
      (node: HTMLInputElement | HTMLTextAreaElement | null) => {
        internalRef.current = node;

        if (typeof externalRef === 'function') {
          externalRef(node);
        } else if (externalRef && 'current' in externalRef) {
          (
            externalRef as React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>
          ).current = node;
        }
      },
      [externalRef],
    );

    const isTextarea = variant && (TEXTAREA_THEMES as readonly string[]).includes(variant);

    const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (isTextarea && variant === 'comment') {
        setIsFocused(true);
      }
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (isTextarea && variant === 'comment') {
        setTimeout(() => {
          if (document.activeElement !== internalRef.current) {
            setIsFocused(false);
          }
        }, 50);
      }
      onBlur?.(event);
    };

    const scrollbarClass = variant === 'comment' ? 'custom-scrollbar' : '';
    const combinedClassName = cn(
      inputVariants({ variant, size, status }),
      scrollbarClass,
      className,
    );

    if (isTextarea && variant === 'comment') {
      const containerClasses = cn(
        'relative w-full',
        isFocused ? ' min-h-[120px]' : 'w-[554px] h-[39px]',
      );
      return (
        <div className={containerClasses}>
          <textarea
            ref={setRefs as React.Ref<HTMLTextAreaElement>}
            className={combinedClassName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {isFocused && showCommentButtons && (
            <div className="absolute  flex gap-2 z-10">
              <Button variant="secondary" size="xs">
                취소
              </Button>

              <Button variant="primary" size="xs">
                작성
              </Button>
            </div>
          )}
        </div>
      );
    } else if (isTextarea) {
      return (
        <textarea
          ref={setRefs as React.Ref<HTMLTextAreaElement>}
          className={combinedClassName}
          {...props}
        />
      );
    }

    return (
      <input
        ref={setRefs as React.Ref<HTMLInputElement>}
        className={combinedClassName}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
export default Input;
