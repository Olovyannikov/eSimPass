import * as React from 'react';
import { PrivateApplication } from '../../client/app/desktop/private/PrivateApplication';
import { STORAGE } from '../../client/StorageAdapter';
import { useRouter } from 'next/router';

const ChooseRates = () => {

    const [hasMounted, setHasMounted] = React.useState<boolean>(false);
    
    const router = useRouter();

    React.useEffect(() => {
        setHasMounted(prev => prev = true);
    }, [])

    const checkAuthUser = () => {
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
    
    return hasMounted && checkAuthUser()
}

export default ChooseRates;
