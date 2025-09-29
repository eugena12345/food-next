'use client'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import ArrowDownIcon from '~/components/icons/ArrowDownIcon';
import styles from './MultiDropdown.module.scss';
import type { Option, MultiDropdownProps } from './types';


const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className, options, value, onChange, disabled, getTitle,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [inputValue, setInputValue] = React.useState(getTitle(value));
  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(inputValue.toLowerCase())
  );

  const openOptions = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
    if (disabled === true) {
      return;
    }
    event.stopPropagation();
    setIsOptionsOpen(true);
  }, [disabled]);
  const closeOptions = useCallback(() => setIsOptionsOpen(false), []);

  const dropdownRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeOptions();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const args: { placeholder: string, value: string } = {
    placeholder: '',
    value: '',
  };
  if (value.length === 0) {
    args.placeholder = getTitle(value);
  };
  if (inputValue.length > 0) {
    args.value = inputValue;
    args.placeholder = getTitle(value);
  } else if (value.length > 0 && inputValue === '' && isOptionsOpen) {
    args.placeholder = getTitle(value);
  } else if (value.length > 0 && inputValue === '' && !isOptionsOpen) {
    args.value = getTitle(value);
  }

  const handleClick = useCallback((item: Option): void => {
    const itemKey = item.key.toString();

    if (value.some((selectedItem) => {
      return selectedItem.key.toString() === itemKey
    })) {
      const newValue = value.filter((selectedItem) => selectedItem.key.toString() !== itemKey);
      onChange(newValue);
    } else {
      const newValue = [...value, item];
      onChange(newValue);
    }
  }, [value, onChange]);

  const handleUpdateInputValue = useCallback((stringValue: string): void => {
    setInputValue(stringValue)
  }, []);
  return (
    <div className={styles.container}>
      <Input className={className} onChange={handleUpdateInputValue} afterSlot={<ArrowDownIcon />} disabled={disabled} onClick={openOptions} {...args}
      />
      <div ref={dropdownRef} className={styles.options}>
        {isOptionsOpen && !disabled &&
          filteredOptions.map((item) => {
            const className = value.some((selectedItem) => selectedItem.key.toString() === item.key) ?
              styles['options__option--selected']
              : styles['options__option'];
            return <div key={item.key} onClick={() => handleClick(item)} className={className}>{item.value}</div>
          })
        }
      </div>
    </div>
  )
};

export default memo(MultiDropdown);
