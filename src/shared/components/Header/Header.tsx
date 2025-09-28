import Image from 'next/image';
import Link from 'next/link';
import HeaderNav from '../HeaderNav/HeaderNav';
import styles from './Header.module.scss';
import logo from './../../../../public/images/Group.svg';
import { routes } from '~/shared/config/routes.config';
import UserStatusActions from '../UserStatusActions/UserStatusActions';

const Header = () => {


    return (
        <div className={styles.generalHeaderContainer}>

            <div className={styles.headerContainer}>
                <Link href={routes.main.create()}>
                    <div className={styles.logoContent} >
                        <Image src={logo} alt='logo' className={styles.logo} />
                        <div className={styles.logoTitle}>Food Client</div>
                    </div>
                </Link>
                <HeaderNav />
                <div className={styles.logoContent}>
                    <UserStatusActions />
                </div>
            </div>
        </div>
    )
};

export default Header;