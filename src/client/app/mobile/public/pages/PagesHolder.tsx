import * as React from 'react';
import { ConnectEsim } from './connectEsim/ConnectEsim';

import { IndexPage } from './index/IndexPage';
import { Registration } from './registration/Registration';
import { useRouter } from 'next/router';

export const PagesHolder = () => {

    const router = useRouter();

    const renderPage = () => {

        if (router.pathname === '/registration') {
            return <Registration />
        }
        else if (router.pathname === '/connectEsim') {
            return <ConnectEsim />
        }
        else if (router.pathname === '/') {
            return <IndexPage />
        }
        else return <></>

    }

    return (
        <div className="PagesHolder">
            {renderPage()}
        </div>
    )
}

