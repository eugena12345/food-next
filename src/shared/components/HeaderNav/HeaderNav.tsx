'use client'
// import Link from 'next/link';
import styles from './HeaderNav.module.scss';
import { memo, useCallback, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { menuItems } from './config';
import Link from 'next/link';

const HeaderNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleStateChange = useCallback((state: { isOpen: boolean }) => {
        setIsMenuOpen(state.isOpen);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);
    return (

        <div>
            <Menu
                isOpen={isMenuOpen}
                onStateChange={handleStateChange}
                width={'45%'}
                right={false}
                customBurgerIcon={<button className={styles.burger}>☰</button>}
                customCrossIcon={<button className={styles.close}>×</button>}
                styles={{
                    bmBurgerButton: {
                        position: 'relative',
                        width: '25px',
                        heigth: '25px',
                    },
                    bmOverlay: {
                        top: '-16px',
                        //TODO посмотреть как сделать типа такого в топ `${vars.$spaceM}`
                        background: 'rgb(241 213 185 / 89%)',
                    },
                    bmMenuWrap: {
                        height: 'auto',
                    },
                    bmMenu: {
                        height: 'auto',
                    },
                }}
            >
                <ul className={styles.navList}>
                    {menuItems.map((item) => (
                        <li className={styles.navItem} key={item.label}>
                            <Link
                                href={item.route}
                                className={styles.navLink}
                                onClick={closeMenu}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Menu>

            <nav className={styles.navMenu}>
                <ul className={styles.navList}>
                    {menuItems.map((item) => {
                        return (<li className={styles.navItem} key={item.label}>
                            <Link className={styles.navLink} href={item.route}>
                                {item.label}
                            </Link>
                        </li>)
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default memo(HeaderNav);