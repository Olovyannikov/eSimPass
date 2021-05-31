import * as React from 'react';
import { PrivateApplication } from '../../client/app/desktop/private/PrivateApplication';
import { STORAGE } from '../../client/StorageAdapter';
import { useRouter } from 'next/router';
import { getServerSideProps as getListRates } from '..';
import { GetServerSideProps } from 'next';
import { CustomErrorPage } from '../404';

const ChooseRates = () => {

    const [hasMounted, setHasMounted] = React.useState<boolean>(false);
    const [isAuth, setIsAuth] = React.useState<boolean>(false);
    
    const router = useRouter();

    // React.useEffect(() => {
    //     const token = STORAGE.getToken()
    //     if (token) {
    //         setIsAuth(true)
    //     }
    //     else {
    //         setIsAuth(false)
    //         router.push('/')
    //     }

    //     // setHasMounted(true)

    // }, [isAuth])

    const checkAuthUser = () => {
        if (isAuth && router.pathname === '/cabinet/chooseRates') {
            return <PrivateApplication />
        }
        else {
            router.replace('/')
            return <CustomErrorPage />
        }
    }
    
    return  <PrivateApplication />
}
// export const getServerSideProps : GetServerSideProps = getListRates
export default ChooseRates;
