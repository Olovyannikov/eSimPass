import * as React from 'react';

import { PrivateApplication } from '../../client/app/desktop/private/PrivateApplication';
import { useRouter } from 'next/router';
import { STORAGE } from '../../client/StorageAdapter';

const Cabinet = () => {

    const router = useRouter();

    const [hasMounted, setHasMounted] = React.useState<boolean>(false);

    const checkAuthenticatedUser = () => {
        if (STORAGE.getToken() !== null) {
            return (
                <PrivateApplication />
            )
        }
        else {
            router.replace('/')
            return <></>
        }
    }

    React.useEffect(() => {
        setHasMounted(prev => prev = true);
    }, [])
    
    return hasMounted && checkAuthenticatedUser()

}

export default Cabinet;
