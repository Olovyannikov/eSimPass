import * as React from "react";
import { IndexPage } from "./index/IndexPage";
import { useRouter } from 'next/router';
import { RefundConditions } from "./refundConditions/RefundConditions";

export const PagesHolder = () => {

    const router = useRouter();

    const [isMounted, setIsMounted] = React.useState<boolean>(false)

    React.useEffect(() => setIsMounted(true), [])

    const handlePages = () => {
        // if (typeof window !== 'undefined') {
            if (router.pathname === '/') {
                return <IndexPage />
            }
            else if (router.pathname === '/refund_conditions') {
                return <RefundConditions />
            }
        // }
    }

    return (
        <div className="PagesHolder">
            {/* <IndexPage/> */}
            {isMounted && handlePages()}
        </div>
    )
}
