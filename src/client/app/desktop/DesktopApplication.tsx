import * as React from 'react';

import { STORAGE } from '../../StorageAdapter';
import { PublicApplication } from './public/PublicApplication';
import { PrivateApplication } from "./private/PrivateApplication";

import { useRouter } from 'next/router';

const DesktopApplication = () => {

    const router = useRouter();

    const checkAuthenticatedUser = () => {
        if (typeof window !== 'undefined') {
            if (STORAGE.getToken() !== null && router.pathname === '/cabinet') {
                return <PrivateApplication />
            }
            else {
                return <PublicApplication />
            }
        }
        else {
            return <PublicApplication />
        }
    }

    return (
        checkAuthenticatedUser()
    )
}

export default DesktopApplication
