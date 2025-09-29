import { memo } from 'react';
import styles from './SearchInfo.module.scss';
import Text from '~/components/Text';

const SearchInfo = () => {
    return (
        <div className={styles.container}>

            <Text className={styles.withoutMargin} view='p-20' color='primary'>Find the perfect food and drink ideas for every occasion,
                from weeknight dinners to holiday feasts.</Text>
        </div>
    )
}

export default memo(SearchInfo);