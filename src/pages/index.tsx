import * as React from 'react';
import * as grpc from "grpc"

import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { PublicApplication } from 'app/public/PublicApplication';
import {RateGrpcClient, ListRatesResponse} from "./../client/generated/proto";

const Main = () => {
    return <PublicApplication />
}

export const getServerSideProps : GetServerSideProps = async (context : GetServerSidePropsContext) => {

    return {
        props : {}
    }
}

export default Main;
