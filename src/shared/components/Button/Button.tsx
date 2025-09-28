import React, { memo } from 'react';
import Loader from '~/components/Loader';
import styles from './Button.module.scss';
import type { ButtonProps } from './types';


const Button: React.FC<ButtonProps> = (props) => {
  const actualStyle = props.disabled ? styles.disabled : styles.original;

  return (
    <button
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      data-testid={props['data-testid']}
      disabled={(props.loading || props.disabled)}
      className={actualStyle}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onMouseOut={props.onMouseOut}
      id={props.id}
      name={props.name}
      style={props.style}
    >
      {props.loading && <Loader size='s' className='white' />}
      {props.children}
    </button>
  )
};

export default memo(Button);
