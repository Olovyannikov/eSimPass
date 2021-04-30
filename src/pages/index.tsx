import * as React from 'react';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ListRatesResponse } from '../client/generated/proto.web';
import axios from 'axios';
import {v4 as uuid} from "uuid"
import { STATE_API } from '../client/redux/StateApi';

import Application  from '../client/app/Application';
import DesktopApplication from '../client/app/desktop/DesktopApplication';

interface Props {
    listRates : ListRatesResponse.SuccessModel.RateModel[];
}

const Main = ({listRates} : Props) => {
console.log(listRates);

    React.useEffect(() => {

        if (listRates) {
            
            STATE_API.setListRates(listRates)
        }
    }, [])
    
    return <DesktopApplication />
}

export const getServerSideProps : GetServerSideProps = async (context : GetServerSidePropsContext) => {

    const requestId = uuid().toString();
    const res = await axios.post<ListRatesResponse>('https://toesim-dev.stand.gmdp.io/http-api/api.Rate/listRates', {
        body: JSON.stringify({}),
    },{
        headers: {
            'Content-Type': 'application/json',
            authorization: null,
            'x-request-id': requestId,
            'x-partner-id': 'gm',
            'x-client-platform': 'web',
            'x-client-version': '1.0.0'
        },
    })
    const listRates = res.data.success.rates
    console.log(listRates);
    
    return {
        props : {
            listRates
        }
    }
}

export default Main
