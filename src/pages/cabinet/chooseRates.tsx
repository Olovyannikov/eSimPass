import * as React from 'react';
import { PrivateApplication } from '../../client/app/desktop/private/PrivateApplication';
import { PublicApplication } from '../../client/app/desktop/public/PublicApplication';
import { STORAGE } from '../../client/StorageAdapter';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
import { STATE_API } from '../../client/redux/StateApi';
import { Navbar } from '../../client/app/desktop/private/pages/cabinet/blocks/navbar/Navbar';
import { Chooser } from '../../client/app/desktop/private/pages/chooser/Chooser';

import { ListRatesResponse } from '../../client/generated/proto.web';
import { getServerSideProps as getListRates } from '..';
import { GetServerSideProps } from 'next';
// const DynamicPrivateApplication = dynamic(() => import('../../client/app/desktop/private/PrivateApplication') as any, {ssr : false})

interface IndexModel {
    listRates? : ListRatesResponse.SuccessModel.RateModel[]
}

const ChooseRates = ({ listRates } : IndexModel) => {

    const [hasMounted, setHasMounted] = React.useState<boolean>(false);
    
    const router = useRouter();

    React.useEffect(() => {
        setHasMounted(prev => prev = true);
    }, [])

    // if (!hasMounted) {
    //     return <h1>LOading</h1>
    // }
    const checkAuthUser = () => {
        if (STORAGE.getToken() !== null) {
            return (
                <PrivateApplication />
            )
        }
        else {
            router.replace('/')
            return <></>
        }
    }
    
    return hasMounted && checkAuthUser()
}
export const getServerSideProps : GetServerSideProps = getListRates;

export default ChooseRates;
