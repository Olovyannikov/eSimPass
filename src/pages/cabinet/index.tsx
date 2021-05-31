import * as React from 'react';

import { PrivateApplication } from '../../client/app/desktop/private/PrivateApplication';
import { useRouter } from 'next/router';
import { STORAGE } from '../../client/StorageAdapter';
import { getServerSideProps as getListRates } from '..';
import { GetServerSideProps } from 'next';
import { CustomErrorPage } from '../404';

const Cabinet = () => {

    const router = useRouter();

    const [isAuth, setIsAuth] = React.useState<boolean>(null);

    // React.useEffect(() => {
    //     const token = STORAGE.getToken()
    //     if (token) {
    //         setIsAuth(true)
    //     }
    //     else {
    //         setIsAuth(false)
    //         router.push('/')
    //     }

    // }, [isAuth])

    // const checkAuthenticatedUser = () => {
    //     if (isAuth && router.pathname ==='/cabinet') {
    //         return <PrivateApplication />
    //     }
    //     else {
    //         return <CustomErrorPage />
    //     }
    // }

    return  <PrivateApplication />

}

// export const getServerSideProps : GetServerSideProps = getListRates;

export default Cabinet;
