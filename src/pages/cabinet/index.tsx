import * as React from 'react';

import { PrivateApplication } from '../../client/app/desktop/private/PrivateApplication';
import { useRouter } from 'next/router';
import { STORAGE } from '../../client/StorageAdapter';


const Cabinet = () => {

    const router = useRouter();

    const handleRoutindPage = () => {
        if (typeof window !== 'undefined') {
            if (STORAGE.getToken() && router.pathname === '/cabinet') {
                return <PrivateApplication />
            }
            else {
                router.replace('/')
            }
        }
    }


    return (
        <div className="Application">
            <div className="Desktop">
                {handleRoutindPage()}
            </div>
        </div>
    )

}

export default Cabinet
