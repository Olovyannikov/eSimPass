import * as React from 'react';
import * as rx from "rxjs"
import * as ro from "rxjs/operators"

import { Button } from '../../../../../components/buttons/Button';
import { CONNECTION } from '../../../../../../../../Connection';
import { CreateBalancePaymentRequest, CreateBalancePaymentResponse } from '../../../../../../../../generated/proto.web';
import { hasWebApi, waitForClose, Logger } from '../../../../../../../../utils';
import { Spinner } from '../../../../../components/spinnerPayment/Spinner';

export const TopUpBalance = () => {

    const logger = new Logger ('RegistrationDialog');

    const inputBalance = React.useRef<HTMLInputElement>();

    const [inProgress, setInProgress] = React.useState<boolean>(true);
    const [minAmount, setMinAmount] = React.useState<string>('100');
    const [error, setError] = React.useState<boolean>(false);
    
    const closedSubject = waitForClose ();

    React.useEffect(() => {
        CONNECTION.getMinBalancePaymentAmmount({})
            .pipe (
                ro.tap(response => {
                    setInProgress(prev => prev = false);
                    setMinAmount(prev => prev = response.ammount)
                }),
                ro.takeUntil (closedSubject)
            )
            .subscribe (logger.rx.subscribe ("Error in getMinBalancePaymentAmmount"))
    }, [minAmount])

    const handleBalancePayment = () => {
        setInProgress(prev => prev = true);
        setError(null);

        CONNECTION.createBalancePayment(createBalancePaymentRequest())
            .pipe (
                ro.tap(parseBalancePaymentResponse),
                ro.takeUntil(closedSubject)    
            )
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
        
        if (hasWebApi()) {
            window.open(response.success.url);
        }
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
            return <div className="text error">Не менее {minAmount}₽</div>
        } 
        else {
            return <div className='text'>От {minAmount}₽ до 10000₽</div>
        }
    }

    return (
        <div className="TopUpBalance">
            <div className='top-up-block'>
                <div>Пополните свой счет</div>
                <input autoComplete='new-password' disabled={inProgress} placeholder={'5₽'}  ref={inputBalance} type="text" className='input'/>
                <Button disabled={inProgress} func={handleBalancePayment} className='button-top-up' text='Пополнить'/>
                {showInProgress()}
                {showError()}
            </div>
        </div>
    )
}

