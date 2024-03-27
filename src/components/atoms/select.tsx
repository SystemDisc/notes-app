'use client';

import { DetailedHTMLProps, PropsWithChildren, SelectHTMLAttributes } from 'react';
import cx from 'classnames';

export default function Select({
  label,
  children,
  className,
  id,
  ...props
}: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & PropsWithChildren<{
  label: string,
}>) {
  return (
    <div className='relative'>
      <select id={id} className={cx('px-2 py-1 h-9 rounded border border-neutral-300 bg-white', className)} {...props}>
        {children}
      </select>
      <label htmlFor={id} className='absolute bg-[linear-gradient(to_top,_rgb(255_255_255)_calc(50%_+_2px),_transparent_calc(50%_-_2px))] px-1 top-[-8px] left-[6px] text-xs cursor-default select-none'>{label}</label>
    </div>
  );
}
