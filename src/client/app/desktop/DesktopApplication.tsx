import * as React from 'react';

import { STORAGE } from '../../StorageAdapter';
import { PublicApplication } from './public/PublicApplication';
import { PrivateApplication } from "./private/PrivateApplication";

import { useRouter } from 'next/router';

const DesktopApplication = () => {

    const router = useRouter();

    const [isAuth, setIsAuth] = React.useState(false);

    React.useEffect(() => {
        const token = STORAGE.getToken();
        if (token) {
            setIsAuth(true)
        }
        else {
            setIsAuth(false)
        }
        
        // setIsMounted(true)
    }, [])

    const checkAuthenticatedUser = () => {
            if (router.pathname === '/cabinet' || router.pathname === '/cabinet/chooseRates') {
                return <PrivateApplication />
            }
            else {
                return <PublicApplication />
            }
    }

    // return (
    //     isMounted && checkAuthenticatedUser()
    // )
}

export default DesktopApplication
 