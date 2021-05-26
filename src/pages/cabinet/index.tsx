import * as React from 'react';

import { PrivateApplication } from '../../client/app/desktop/private/PrivateApplication';
import { useRouter } from 'next/router';
import { STORAGE } from '../../client/StorageAdapter';
import { GetServerSideProps } from 'next';
import { ListRatesResponse } from '../../client/generated/proto.web';
import { getServerSideProps as getListRates } from '..';
import { STATE_API } from '../../client/redux/StateApi';
import { PublicApplication } from '../../client/app/desktop/public/PublicApplication';
import { Navbar } from '../../client/app/desktop/private/pages/cabinet/blocks/navbar/Navbar';
import { Cabinet as Cabinet1} from '../../client/app/desktop/private/pages/cabinet/Cabinet';

interface IndexModel {
    listRates? : ListRatesResponse.SuccessModel.RateModel[]
}
// import dynamic from 'next/dynamic';

// const DynamicPrivateApplication = dynamic(() => import('../../client/app/desktop/private/PrivateApplication') as any, {ssr : false})

const Cabinet = ({ listRates } : IndexModel) => {

    const router = useRouter();

    const [hasMounted, setHasMounted] = React.useState<boolean>(false);

    const checkAuthenticatedUser = () => {
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

    React.useEffect(() => {
        setHasMounted(prev => prev = true);

        if (listRates) {
            STATE_API.setListRates(listRates)
        }

        
    }, [])
    
    // if (!hasMounted) {
    //     return <h1>LOading</h1>
    // }

    return hasMounted && checkAuthenticatedUser()

}

export const getServerSideProps : GetServerSideProps = getListRates;

export default Cabinet;
