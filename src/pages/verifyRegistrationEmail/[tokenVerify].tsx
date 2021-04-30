import * as React from 'react';
import Router from 'next/router';

const Index = () => {

    // React.useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log(Router.query.tokenVerify);
        }
    // },[])

    return <h1>gfdg</h1>
}

export default Index
     