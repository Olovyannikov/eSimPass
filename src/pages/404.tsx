import * as React from 'react';
import { useRouter } from 'next/router';

export const CustomErrorPage = () => {

    const router = useRouter();

    React.useEffect(() => {
        router.push('/')
    })

    return <></>

}

export default CustomErrorPage;
