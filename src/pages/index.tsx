import * as React from 'react';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { PublicApplication } from 'app/desktop/public/PublicApplication';

const Main = () => {

    return <PublicApplication />
}

export const getServerSideProps : GetServerSideProps = async (context : GetServerSidePropsContext) => {

    return {
        props : {}
    }
}

export default Main;
