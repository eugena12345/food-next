'use client';
import styles from './HeaderNav.module.scss';
import { memo, useCallback, useState } from 'react';
import { menuItems } from './config';
import Link from 'next/link';

const HeaderNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleMenuToggle = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <div className={styles.headerNav}>
            <button className={`${styles.burger} ${isMenuOpen ? styles.active : ''}`} onClick={handleMenuToggle}>
                ☰
            </button>

            {isMenuOpen && (
                <div className={styles.overlay} onClick={closeMenu}>
                    <nav className={styles.dropdownMenu} onClick={(e) => e.stopPropagation()}>
                        <ul className={styles.navList}>
                            {menuItems.map(item => (
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
                    </nav>
                </div>
            )}
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
    );
}

export default memo(HeaderNav);