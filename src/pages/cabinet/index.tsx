import * as React from 'react';

import { PrivateApplication } from '../../client/app/desktop/private/PrivateApplication';
import { useRouter } from 'next/router';
import { STORAGE } from '../../client/StorageAdapter';
import { GetServerSideProps } from 'next';
import { ListRatesResponse } from '../../client/generated/proto.web';
import { getServerSideProps as getListRates } from '..';
import { STATE_API } from '../../client/redux/StateApi';
import { PublicApplication } from '../../client/app/desktop/public/PublicApplication';

interface IndexModel {
    listRates : ListRatesResponse.SuccessModel.RateModel[]
}


const Cabinet = ({ listRates } : IndexModel) => {

    const router = useRouter();

    const [hasMounted, setHasMounted] = React.useState<boolean>(false);

    const checkAuthenticatedUser = () => {
        if (STORAGE.getToken() !== null && router.pathname === '/cabinet') {
            return <PrivateApplication />
        }
        else {
            router.replace('/')
            return <></>
        }
    }

    React.useEffect(() => {
        setHasMounted(prev => prev = true);

        if (listRates) {
            STATE_API.setListRates(listRates)
        }

    }, [])


    return hasMounted && checkAuthenticatedUser()

}

export const getServerSideProps : GetServerSideProps = getListRates

export default Cabinet;
