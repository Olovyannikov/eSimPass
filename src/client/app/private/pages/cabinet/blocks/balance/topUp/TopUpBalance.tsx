import * as React from 'react';

import { Button } from '../../../../../components/buttons/Button';
import { CONNECTION } from '../../../../../../../Connection';
import { CreateBalancePaymentRequest, CreateBalancePaymentResponse } from '../../../../../../../generated/proto.web';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { waitForClose } from '../../../../../../../utils';
import { Spinner } from '../../../../../components/spinnerPayment/Spinner';
import { useHistory } from 'react-router-dom';


export const TopUpBalance = () => {

    
    const logger = new Logger ('RegistrationDialog');
    
    const closedSubject = waitForClose ();
    
    React.useEffect(() => {
        return () => closedSubject.next()
    }, [])
    
    const history = useHistory();

    const inputBalance = React.useRef<HTMLInputElement>();

    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>(null);

    const handleBalancePayment = () => {
        setInProgress(prev => prev = true);

        setError(null);

        CONNECTION.createBalancePayment(createBalancePaymentRequest())
            .do(parseBalancePaymentResponse)
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error balance payment'))
            
    }

    const parseBalancePaymentResponse = (response : CreateBalancePaymentResponse) => {

        if (response.unauthorized) {
            
        } 
        else if (response.invalidRequest) {

        }
        else if (response.success) {
            handleSuccessResponse(response)
        } 
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

    return (
        <div className="TopUpBalance">
            <div className='top-up-block'>
                <div>Пополните свой счет</div>
                <input disabled={inProgress} ref={inputBalance} placeholder='500 €' type="text" className='input'/>
                <Button disabled={inProgress} func={handleBalancePayment} className='button-top-up' text='Пополнить'/>
                {showInProgress()}
                <div className='text'>От 1€ до 100€</div>
            </div>
        </div>
    )
}
