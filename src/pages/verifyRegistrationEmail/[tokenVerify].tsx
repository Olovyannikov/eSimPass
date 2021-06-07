import * as React from 'react';

import { useRouter } from 'next/router';
import { STATE_API } from '../../client/redux/StateApi';
import Main, { getServerSideProps as getListRates } from '../index';
import { GetServerSideProps } from 'next';
import { ListRatesResponse } from '../../client/generated/proto.web';

const Index = () => {

    const router = useRouter();

    React.useEffect(() => {

        if (router.query) {
            STATE_API.showPublicWizard('verifyRegistration')
        }

    },[])

    return <Main />
}

export const getServerSideProps : GetServerSideProps = getListRates

export default Index;

     