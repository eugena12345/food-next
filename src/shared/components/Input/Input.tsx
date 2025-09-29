'use client'
import React, { memo } from 'react';
import styles from './Input.module.scss';
import type { InputProps } from './types';


const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };
    return (
      <div className={styles.container}>
        <input type="text" placeholder='Text' value={value} onChange={handleChange} ref={ref}  {...rest} />
        {afterSlot && afterSlot}
      </div>
    )
  });

Input.displayName = 'Input';

export default memo(Input);
