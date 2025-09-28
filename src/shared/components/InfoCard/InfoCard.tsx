// 'use client'

import React, { memo } from 'react';
import styles from './Card.module.scss';
import Text from '~/components/Text';
import type { CardProps } from './types';
import classNames from 'classnames';
//import Image from "next/image";


const InfoCard: React.FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot, itemDocumentId }) => {
    const actualClassName = classNames(styles.card, className);

    return (
        <div className={actualClassName} > 
        {/* //onClick={onClick && onClick} */}
            <div className={styles['card__image-container']}>
                <img src={image} alt='картинка' className={styles.card__image} />
            </div>
            <div className={styles['card__info']}>
                <div className={styles['card__description']}>
                    {captionSlot && <p className={styles['card__caption']}>{captionSlot}</p>}
                    <div className={styles['card__title']}>
                        <Text className="pb-8" view={'p-20'} weight='medium' maxLines={1} color='primary'>{title}</Text>
                    </div>
                    <Text className="pb-8" view={'p-16'} weight='normal' maxLines={2} color='secondary'>{subtitle}</Text>
                </div>

                <div className={styles['card__buy-info']}>
                    <div className={styles['card__price']}>
                        {contentSlot}
                    </div>
                    <div>{actionSlot}</div>
                </div>
            </div>


        </div>
    )
};

export default memo(InfoCard);