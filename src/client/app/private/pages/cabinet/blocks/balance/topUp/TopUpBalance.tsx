import * as React from 'react';

import { Button } from '../../../../../components/buttons/Button';
import { CONNECTION } from '../../../../../../../Connection';
import { CreateBalancePaymentRequest, CreateBalancePaymentResponse } from '../../../../../../../generated/proto.web';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { waitForClose } from '../../../../../../../utils';
import { Spinner } from '../../../../../components/spinnerPayment/Spinner';


export const TopUpBalance = () => {

    const logger = new Logger ('RegistrationDialog');

    const inputBalance = React.useRef<HTMLInputElement>();

    const [inProgress, setInProgress] = React.useState<boolean>(true);
    const [minAmount, setMinAmount] = React.useState<string>('5')
    const [error, setError] = React.useState<boolean>(false);
    
    const closedSubject = waitForClose ();

    React.useEffect(() => {
        CONNECTION.getMinBalancePaymentAmmount({})
            .do(response => {
                setInProgress(prev => prev = false);
                setMinAmount(prev => prev = response.ammount)
            })
            .takeUntil (closedSubject)
            .subscribe (logger.rx.subscribe ("Error in getMinBalancePaymentAmmount"))
    }, [])

    const handleBalancePayment = () => {
        setInProgress(prev => prev = true);
        setError(null);

        CONNECTION.createBalancePayment(createBalancePaymentRequest())
            .do(parseBalancePaymentResponse)
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error balance payment'))
            
    }

    const parseBalancePaymentResponse = (response : CreateBalancePaymentResponse) => {
        if (response.success) {
            handleSuccessResponse(response)
        }
        else if (response.ammountIsLessMinimal) {
            handleErrorAmountIsLessMin()
        }
    }

    const handleErrorAmountIsLessMin = () => {
        setError(prev => prev = true);
        setInProgress(prev => prev = false);
    }

    const handleSuccessResponse = (response : CreateBalancePaymentResponse) => {
        setInProgress(prev => prev = false);
        window.open(response.success.url)
    }

    const createBalancePaymentRequest = () : CreateBalancePaymentRequest => ({
        amount : inputBalance.current.value
    })

    const showInProgress = () => {
        if (inProgress) {
            return <Spinner />
        }
    }

    const showError = () => {
        if (error) {
            return <div className="text error">Не менее {minAmount}€</div>
        } 
        else {
            return <div className='text'>От {minAmount}€ до 100€</div>
        }
    }

    return (
        <div className="TopUpBalance">
            <div className='top-up-block'>
                <div>Пополните свой счет</div>
                <input disabled={inProgress} ref={inputBalance} placeholder={`${minAmount} €`} type="text" className='input'/>
                <Button disabled={inProgress} func={handleBalancePayment} className='button-top-up' text='Пополнить'/>
                {showInProgress()}
                {showError()}
            </div>
        </div>
    )
}
//https://toesim-dev.stand.gmdp.io/deeplink/payment/success?paymentId=1615543967968X10094
