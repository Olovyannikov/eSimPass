import * as React from "react";
import Router from "next/router";
import { Logger } from "@glonassmobile/codebase-web/Logger";
import { CONNECTION } from "../../client/Connection";
import { CreateDevicePaymentResponse, CreateDevicePaymentRequest } from "../../client/generated/proto.web";
import { img_secondStep, img_stepBack } from "../../client/resources/images";
import { waitForClose, hasWebApi } from "../../client/utils";
import { Button } from '../../client/app/mobile/public/components/buttons/Button';

export const ConnectEsim = () => {

    const [inProgress, setInProgress] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>(null);

    const logger = new Logger('Connect Esim');

    const closedSubject = waitForClose();

    const backToregistration = () => Router.push('/registration');

    const handleConfirmPurchase = () => {

        setInProgress(prev => prev = true);

        CONNECTION.createDevicePayment(createDevicePaymentRequest())
            .do(response => {
                if (response.success) {
                    handleSuccessResponse(response);
                }   
                else {
                    handlePlainError('Ошибка при пополнении баланса')
                }
            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in get device payment request'));

    }

    const handleSuccessResponse = (response : CreateDevicePaymentResponse) => {
        setInProgress(prev => prev = false);

        if (hasWebApi()) {
            window.open(response.success.url);
        }
    }

    const handlePlainError = (error : string) => {
        setError(prev => prev = error)
        setInProgress(prev => prev = false);
    }

    const createDevicePaymentRequest = () : CreateDevicePaymentRequest => ({});

    const showError = () => {
        if (error) {
            return <div className="error">{error}</div>
        }
    }

    return (
        <div className="ConnectEsim">
            <div className="title">Подключение eSIM</div>
            <div className="text-step">Всего два шага для подключения</div>
            <img className='img-step' src={img_secondStep} alt="First Step"/>
            <div className="text-action">Пополните счет на 10₽</div>
            <Button disabled={inProgress} func={handleConfirmPurchase} className='button-buy' text='Пополнить'/>
            {showError()}
            <img onClick={backToregistration} className='button-back' src={img_stepBack} alt="Back to register"/>
        </div>
    )
}


export default ConnectEsim