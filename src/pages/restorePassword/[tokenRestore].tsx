import * as React from 'react';

import Router from 'next/router';
import { PublicApplication } from '../../client/app/desktop/public/PublicApplication';

const Index = () => {

    const [onClient, setOnClient] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            if (Router.query) {
                console.log('fdasfda',Router.query)
            }
        }
    }, [])

    return <PublicApplication />

}
 
export default Index
