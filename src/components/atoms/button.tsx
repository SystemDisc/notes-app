import classNames from 'classnames';
import Link from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes } from 'react';

export default function Button({
  buttonType = 'default',
  children,
  isLink = false,
  className,
  ...props
}: {
  buttonType?: 'red' | 'default' | 'selected';
  isLink?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ButtonClass = isLink ? Link : 'button';
  const otherProps = isLink ? props as HTMLAttributes<HTMLAnchorElement> : props as HTMLAttributes<HTMLButtonElement>;
  return (
    <>
      {buttonType === 'default' &&
        <ButtonClass className={classNames('inline-flex justify-center items-center px-4 py-2 border border-white rounded-full tracking-widest bg-green-500 dark:bg-neutral-700 shadow-[#000_0px_2px_2px] dark:shadow-[#fff_0px_2px_2px] text-white active:shadow-[inset_3px_3px_5px_0px_rgba(0,_0,_0,_0.3)] hover:text-neutral-200 disabled:opacity-60 disabled:hover:text-white disabled:cursor-not-allowed disabled:active:shadow-[#000_0px_2px_2px]', className)} {...otherProps as any}>
          {children}
        </ButtonClass>
      }
      {buttonType === 'selected' &&
        <ButtonClass className={classNames('inline-flex justify-center items-center px-4 py-2 border border-white rounded-full tracking-widest bg-blue-500 dark:bg-blue-500 shadow-[#000_0px_2px_2px] dark:shadow-[#fff_0px_2px_2px] text-white active:shadow-[inset_3px_3px_5px_0px_rgba(0,_0,_0,_0.3)] hover:text-neutral-200 disabled:opacity-60 disabled:hover:text-white disabled:cursor-not-allowed disabled:active:shadow-[#000_0px_2px_2px]', className)} {...otherProps as any}>
          {children}
        </ButtonClass>
      }
      {buttonType === 'red' &&
        <ButtonClass className={classNames('inline-flex justify-center items-center px-4 py-2 border border-white rounded-full tracking-widest bg-red-800 shadow-[#000_0px_2px_2px] dark:shadow-[#fff_0px_2px_2px] text-white active:shadow-[inset_3px_3px_5px_0px_rgba(0,_0,_0,_0.3)] hover:text-neutral-200 disabled:opacity-60 disabled:hover:text-white disabled:cursor-not-allowed disabled:active:shadow-[#000_0px_2px_2px]', className)} {...otherProps as any}>
          {children}
        </ButtonClass>
      }
    </>
  );
}
