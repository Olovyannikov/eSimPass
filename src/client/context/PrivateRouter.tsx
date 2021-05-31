import * as React from 'react';
import { useRouter } from 'next/router';

import { useAuth } from './auth';
// import FullPageLoader from './FullPageLoader';

interface PrivateRouteModel {
    children : any;
    protectedRoutes : string[]
}

export default function PrivateRoute(props : PrivateRouteModel) {
    const router = useRouter();
    
    const { isAuthenticated, isLoading } = useAuth();

    const pathIsProtected = props.protectedRoutes.indexOf(router.pathname) !== -1;

    React.useEffect(() => {
        if (!isLoading && !isAuthenticated && pathIsProtected) {
            router.push('/');
        }
    }, [isLoading, isAuthenticated, pathIsProtected]);

    if ((isLoading || !isAuthenticated) && pathIsProtected) {
        // can return error page or some loader
        return <></>;
    }

    return props.children;
}
