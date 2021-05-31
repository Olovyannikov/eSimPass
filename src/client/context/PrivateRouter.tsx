import * as React from 'react';

import { useRouter } from 'next/router';
import { STORAGE } from 'StorageAdapter';

interface PrivateRouteModel {
    children : any;
    protectedRoutes : string[]
}

export default function PrivateRoute(props : PrivateRouteModel) {

    const [isLoading, setIsLoading] = React.useState(true);

    const router = useRouter();

    const pathIsProtected = props.protectedRoutes.indexOf(router.pathname) !== -1;
    const token = STORAGE.getToken()

    React.useEffect(() => {

        if (!isLoading && !token && pathIsProtected) {
            router.push('/');
        }

        setIsLoading(false);

    }, [isLoading, token, pathIsProtected]);

    if ((isLoading || !token) && pathIsProtected) {
        // can return error page or some loader
        return <></>;
    }

    return props.children;
}
