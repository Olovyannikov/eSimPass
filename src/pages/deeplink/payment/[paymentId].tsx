import * as React from 'react';

import { useRouter } from 'next/router';
import { STATE_API } from '../../../client/redux/StateApi';
import PrivateApplication from '../../cabinet';

const Index = () => {

    const router = useRouter();

    React.useEffect(() => {
        if (router.query) {
            STATE_API.showPrivateWizard('waitForPayment')
        }
    }, [])

    return (
        <PrivateApplication />
    )
}

export default Index;
