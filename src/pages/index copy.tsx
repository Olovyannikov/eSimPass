import * as React from 'react';

import * as grpc from "grpc"

import { GetServerSideProps, GetServerSidePropsContext } from 'next';
//import { ListRatesResponse } from '../client/generated/proto.web';
import axios from 'axios';
import { v4 as uuid } from "uuid";
import { STATE_API } from '../client/redux/StateApi';
import DesktopApplication from '../client/app/desktop/DesktopApplication';
import { PublicApplication } from 'app/desktop/public/PublicApplication';
import {RateGrpcClient, ListRatesResponse} from "./../client/generated/proto";

interface Props {
    listRates? : ListRatesResponse.SuccessModel.RateModel[];
}

const Main = ({listRates} : Props) => {

    React.useEffect(() => {
        
        if (listRates) {
            STATE_API.setListRates(listRates)
        }
        
    }, [])
    
    return <PublicApplication />
}

export const getServerSideProps : GetServerSideProps = async (context : GetServerSidePropsContext) => {

    const requestId = uuid().toString();
    
    const metadata = new grpc.Metadata ()
    metadata.add ('x-request-id', requestId)
    metadata.add ('x-partner-id', 'gm')
    metadata.add ('x-client-platform', 'web')
    metadata.add ('x-client-version', '1.0.0')
    
    try {
        const r = new RateGrpcClient ('esimpass-dev.stand.gmdp.io:443', true)
            .listRatesClient ()
            .validateResponses (['success'])
            .execute ({}, metadata)

        console.log (r)
    }
    catch (error) {
        console.error (error)
    }
    /*

    const res = await axios.post<ListRatesResponse>('https://esimpass-dev.stand.gmdp.io/http-api/api.Rate/listRates', {
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
    const listRates = res.data.success.rates*/
    
    return {
        props : {
            listRates : [],
        }
    }
}

export default Main;
