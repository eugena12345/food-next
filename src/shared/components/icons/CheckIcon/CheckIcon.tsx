import * as React from 'react';
import type { IconProps } from './../Icon';
import classNames from 'classnames';

const CheckIcon: React.FC<IconProps> = (props) => {

    const actualClassName = classNames(props.className, props.color);

    return (
        <div className={actualClassName}>
            <svg className={actualClassName}
                width={props.width || 24}
                height={props.height || 24}
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 11.6129L9.87755 18L20 7" stroke="currentColor" stroke-width="2" />
            </svg>
        </div>


    )
}

export default CheckIcon;
