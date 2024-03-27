'use client';

import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import cx from 'classnames';

export default function Dialog({
  children,
  className,
  isOpen,
  onBackdropClick,
}: PropsWithChildren<{
  isOpen: boolean;
  onBackdropClick?: () => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>>) {
  const sectionRef = useRef<HTMLElement>(null);

  const onKeypress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (onBackdropClick) {
        onBackdropClick();
      }
    }
  }, [onBackdropClick]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keyup', onKeypress);

    return () => {
      document.body.classList.remove('modal-open');

      document.removeEventListener('keyup', onKeypress);
    };
  }, [onKeypress])

  if (isOpen) {
    return (
      <>
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,_0,_0,_0.4)] z-50 overflow-auto' onClick={(e) => {
          if (sectionRef.current?.contains(e.target as Node)) {
            return;
          }
          if (onBackdropClick) {
            onBackdropClick();
          }
        }}>
          <section ref={sectionRef} className={cx('mb-4 mt-[72px] mx-auto max-w-4xl shadow-[0px_3px_6px_0px_rgb(0_0_0_/_60%)]', className)}>
            {children}
          </section>
        </div>
      </>
    );
  } else {
    return null;
  }
}
