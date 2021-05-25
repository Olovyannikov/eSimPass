import * as React from 'react';
import { useRouter } from 'next/router';

export const CustomErrorPage : any = () : any => {

    const router = useRouter();

    React.useEffect(() => {
        router.push('/')
    })

    return null

}

export default CustomErrorPage;
