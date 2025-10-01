'use client'; 

import styles from './UserStatusActions.module.scss';
import Image from 'next/image';
import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation'; 
import heartSvg from './../../../../public/images/HeartIcon.svg';
import logoutImg from './../../../../public/images/logout.png';
import { routes } from '~/shared/config/routes.config';
import { authStore } from '~/shared/stores/AuthStore';
import { observer } from 'mobx-react-lite';

const UserStatusActions = () => {
  const router = useRouter(); 
   const { isAuthenticated, logout: logoutAction } = authStore;

  const goToLogin = useCallback(() => {
    router.push(routes.login.create());
  }, [router]);

  const goToFavorite = useCallback(() => {
    router.push(routes.favorite.create());
  }, [router]);

  const handleLogout = useCallback(() => {
    logoutAction();
    router.push(routes.main.create()); 
  }, [logoutAction, router]); 

  return (
    <>
      {isAuthenticated && (
        <>
          <Image
            src={heartSvg}
            alt="heartSvg"
            className={styles.userInfo}
            onClick={goToFavorite}
          />
          <div>{localStorage.getItem('username')}</div>
          <Image
            src={logoutImg}
            alt="logout"
            className={styles.logout}
            onClick={handleLogout}
          />
        </>
      )} 
      {!isAuthenticated && ( 
        <Image
          src="/images/User.svg"
          alt="userSvg"
          width={24}
          height={24}
          className={styles.userInfo}
          onClick={goToLogin}
        />
       )}
    </>
  );
};

export default observer(UserStatusActions);