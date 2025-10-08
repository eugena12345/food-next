'use client';

import styles from './UserStatusActions.module.scss';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import heartSvg from './../../../../public/images/HeartIcon.svg';
import logoutImg from './../../../../public/images/logout.png';
import userSvg from './../../../../public/images/User.svg';
import { routes } from '~/shared/config/routes.config';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/shared/stores/RootStore/RootStoreProvider';

const UserStatusActions = () => {
  const router = useRouter();
  const rootstore = useRootStore()

  const [username, setUsername] = useState('');

  const goToLogin = useCallback(() => {
    router.push(routes.login.create());
  }, [router]);

  const goToFavorite = useCallback(() => {
    router.push(routes.favorite.create());
  }, [router]);

  const handleLogout = useCallback(() => {
    rootstore.authStore.logout()
    router.push(routes.main.create());
  }, [rootstore, router]);

  return (
    <>
       {rootstore.authStore.isAuthenticated && <>
        <Image
          src={heartSvg}
          alt="heartSvg"
          className={styles.userInfo}
          onClick={goToFavorite}
        />
        <div suppressHydrationWarning>{username}</div>
        <Image
          src={logoutImg}
          alt="logout"
          className={styles.logout}
          onClick={handleLogout}
        />
      </>}


     
      {!rootstore.authStore.isAuthenticated && 
      <Image
        src={userSvg}
        alt="userSvg"
        width={24}
        height={24}
        className={styles.userInfo}
        onClick={goToLogin}
      />
       }
    </>
  );
};

export default observer(UserStatusActions);
