import * as React from "react";
import { IndexPage } from "./index/IndexPage";
import { useRouter } from 'next/router';
import { RefundConditions } from "./refundConditions/RefundConditions";
import { TermsOfUse } from "./termsOfUse/TermsOfUse";
import { PaymentSecurityRules } from "./paymentSecurityRules/PaymentSecurityRules";

export const PagesHolder = () => {

    const router = useRouter();

    const [isMounted, setIsMounted] = React.useState<boolean>(false)

    React.useEffect(() => setIsMounted(true), [])

    const handlePages = () => {
        if (router.pathname === '/') {
            return <IndexPage />
        }
        else if (router.pathname === '/refund_conditions') {
            return <RefundConditions />
        }
        else if (router.pathname === '/terms_of_use') {
            return <TermsOfUse />
        }
        else if (router.pathname === '/payment_security_rules') {
            return <PaymentSecurityRules />
        }
    }

    return (
        <div className="PagesHolder">
            {isMounted && handlePages()}
        </div>
    )
}
