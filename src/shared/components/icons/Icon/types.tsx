import * as React from 'react'
import './Icon.css'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
    'data-testid'?: string;
};

