'use client';

import { DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes, MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';
import cx from 'classnames';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function TextInput({
  id,
  label,
  className,
  containerClassName,
  value,
  defaultValue,
  onChange,
  onLabelClick,
  ...props
}: {
  id: string;
  label: string;
  containerClassName?: string;
  onLabelClick?: (e: ReactMouseEvent<HTMLLabelElement, MouseEvent>) => void;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  const [internalValue, setInternalValue] = useState('');
  const [type, setType] = useState<HTMLInputTypeAttribute | undefined>(props.type)

  useEffect(() => {
    setInternalValue((Array.isArray(value) ? value.join(',') : `${value || ''}`) || (Array.isArray(defaultValue) ? defaultValue.join(',') : `${defaultValue || ''}`));
  }, [value, defaultValue]);

  return (
    <div className={cx('relative', containerClassName)}>
      <input id={id} className={cx('px-2 py-1 h-9 border border-neutral-300 rounded peer w-full', className, {
        'bg-white dark:bg-neutral-700': !props.disabled,
        'bg-neutral-100 dark:bg-neutral-700': props.disabled,
      })} data-filled={!!internalValue} value={internalValue} onChange={(e) => {
        setInternalValue(e.target.value);
        if (onChange) {
          return onChange(e);
        }
      }} {...props} type={type} />
      <label htmlFor={id} className={cx('absolute cursor-text px-1 top-[5px] left-[5px] transition-all peer-focus:top-[-8px] peer-focus:left-[6px] peer-focus:text-xs peer-focus:cursor-default peer-data-[filled="true"]:top-[-8px] peer-data-[filled="true"]:left-[6px] peer-data-[filled="true"]:text-xs peer-data-[filled="true"]:cursor-default select-none whitespace-pre text-neutral-600 dark:text-neutral-400 peer-data-[filled="true"]:text-black peer-focus:text-black dark:peer-data-[filled="true"]:text-white dark:peer-focus:text-white', {
        'bg-[linear-gradient(to_top,_rgb(255_255_255)_calc(50%_+_2px),_transparent_calc(50%_-_2px))] dark:bg-[linear-gradient(to_top,_rgb(64_64_64)_calc(50%_+_2px),_transparent_calc(50%_-_2px))]': !props.disabled,
        'bg-[linear-gradient(to_top,_rgb(245_245_245)_calc(50%_+_2px),_transparent_calc(50%_-_2px))] dark:bg-[linear-gradient(to_top,_rgb(64_64_64)_calc(50%_+_2px),_transparent_calc(50%_-_2px))]': props.disabled,
      })} onClick={(e) => {
        if (onLabelClick) {
          onLabelClick(e);
        }
      }}>{label}</label>
      {props.type === 'password' &&
        <div className='flex justify-center items-center h-9 w-9 absolute right-0 top-0 cursor-pointer' onClick={() => {
          setType(type === 'password' ? 'text' : 'password');
        }}>
          {type === 'password' &&
            <BsEye />
          }
          {type === 'text' &&
            <BsEyeSlash />
          }
        </div>
      }
    </div>
  )
}
