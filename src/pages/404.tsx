import * as React from 'react';
import { useRouter } from 'next/router';

export const CustomErrorPage = () => {

    const router = useRouter();

    React.useEffect(() => {
        router.replace('/')
    })

    return null

}

export default CustomErrorPage;
