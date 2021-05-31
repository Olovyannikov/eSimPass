import * as React from 'react';
import { Cabinet } from './cabinet/Cabinet';
import { Chooser } from './chooser/Chooser';
import { useRouter } from 'next/router';


export const PagesHolder = () => {

    const router = useRouter();

    const [hasMounted, setHasMounted] = React.useState<boolean>(false);

    React.useEffect(() => setHasMounted(true),[])

    const renderActivePage = () => {
        const { paymentId } = router.query;
        
        if (router.pathname === '/cabinet' || paymentId) {
            return <Cabinet />
        }
        else if (router.pathname === '/cabinet/chooseRates') {
            return <Chooser />
        }
    }

    return (
        <div className="PagesHolder">
            {hasMounted && renderActivePage()}
        </div>
    )
}

