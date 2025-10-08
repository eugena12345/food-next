import * as React from 'react';
import styles from './Text.module.scss';
import type { TextProps } from './types';
import classNames from 'classnames';

const Text: React.FC<TextProps> = ({
    className, view, tag = 'p', weight, children, color, maxLines = 100
}) => {
    const actualClassName = classNames(className,
        view && styles[view],
        weight && styles[weight],
        color && styles[color]
    );

    const style: React.CSSProperties = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        MozBoxOrient: 'vertical',
        display: '-webkit-box',
        WebkitLineClamp: typeof maxLines === 'number' && maxLines > 0 ? maxLines : 100,
        WebkitBoxOrient: 'vertical',
        lineClamp: typeof maxLines === 'number' && maxLines > 0 ? maxLines : 100,
    };

    const renderTag = (someTag: string) => {
        switch (someTag) {
            case 'h1':
                return <h1 className={actualClassName} style={style} >{children}</h1>;
            case 'h2':
                return <h2 className={actualClassName} style={style}>{children}</h2>;
            case 'h3':
                return <h3 className={actualClassName} style={style}>{children}</h3>;
            case 'h4':
                return <h4 className={actualClassName} style={style}>{children}</h4>;
            case 'h5':
                return <h5 className={actualClassName} style={style}>{children}</h5>;
            case 'h6':
                return <h6 className={actualClassName} style={style}>{children}</h6>;
            case 'div':
                return <div className={actualClassName} style={style}>{children}</div>;
            case 'span':
                return <span className={actualClassName} style={style}>{children}</span>;
            case 'p':
                return <p className={actualClassName} style={style}>{children}</p>;
            default:
                return <p className={actualClassName} style={style}>{children}</p>;
        }
    }
    return renderTag(tag);

}

export default Text;
