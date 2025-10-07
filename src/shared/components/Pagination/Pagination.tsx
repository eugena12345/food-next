'use client'

import styles from './Pagination.module.scss';
import arrowBackIcon from './../../../../public/images/arrow-right.svg';
import arrowForwardIcon from './../../../../public/images/arrow-rightSingle.svg'
import type { PaginationProps } from './types';
import { getNumberCountArr } from '~/utils/helpers';
import Image from 'next/image';
import { useRootStore } from '~/shared/stores/RootStore/RootStoreProvider';

const Pagination = ({ pageCount, actualPage }: PaginationProps) => {
    const { query } = useRootStore();
    const numberCountArr = getNumberCountArr(pageCount);
    const handleClick = (newActualPage: number) => {
        query.updateQueryParam('page', newActualPage.toString())
    };

    return (
        <div className={styles.pagination}>
            <button className={styles.pagination__arrow}
                onClick={() => handleClick(actualPage > 1 ? actualPage - 1 : 1)}
                disabled={actualPage === 1}
            >
                <Image src={arrowBackIcon} alt='back' />
            </button>
            {numberCountArr.map((item) => {

                return (<button className={`${styles.pagination__pagenumber} ${item === actualPage ? styles['pagination__pagenumber--active'] : ''
                    }`}
                    key={item}
                    onClick={() => handleClick(item)}
                >{item}</button>)
            }
            )}
            <button className={styles.pagination__arrow}
                onClick={() => handleClick(actualPage < pageCount ? actualPage + 1 : pageCount)}
                disabled={actualPage === pageCount}
            >
                <Image src={arrowForwardIcon} alt='forward' />
            </button>
        </div>
    )
}

export default Pagination;