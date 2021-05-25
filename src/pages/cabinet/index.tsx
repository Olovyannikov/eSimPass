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

    const handleRoutindPage = () => {
        if (typeof window !== 'undefined') {
            if (STORAGE.getToken() && router.pathname === '/cabinet') {
                return <PrivateApplication />
            }
            else {
                router.replace('/')
                // return <PublicApplication />
            }
        } 
        // else return null
    }

    React.useEffect(() => {
        if (listRates) {
            STATE_API.setListRates(listRates)
        }
    }, [])


    return (
        <>
           {handleRoutindPage()}
        </>
    )

}

export const getServerSideProps : GetServerSideProps = getListRates

export default Cabinet;
