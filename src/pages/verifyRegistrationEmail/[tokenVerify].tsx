import * as React from 'react';

import { useRouter } from 'next/router';
import { STATE_API } from '../../client/redux/StateApi';
import Main, { getServerSideProps as getListRates } from '../index';
import { GetServerSideProps } from 'next';

const Index = ({listRates}) => {

    const router = useRouter();

    React.useEffect(() => {

        if (router.query) {
            STATE_API.showPublicWizard('verifyRegistration')
        }

        if (listRates) {
            STATE_API.setListRates(listRates)
        }

    },[])

    return <Main />
}

export const getServerSideProps : GetServerSideProps = getListRates

export default Index;

     