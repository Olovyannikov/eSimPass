import * as React from 'react';

import { Spinner } from './../../components/spinner/Spinner';
import {VerifyWebRegistrationRequest, VerifyWebRegistrationResponse } from '../../../../generated/proto.web';
import { TokenModel } from '../../PublicApplication';
import { useParams } from 'react-router-dom';
import { CONNECTION } from '../../../../Connection';
import { waitForClose } from '../../../../utils';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { TokenController } from '../../../../utils';
import { STATE_API } from '../../../../redux/StateApi';

export const VerifyDialog = () => {

    const tokenController = new TokenController();

    const logger = new Logger ('VerifyDialog');

    const closedSubject = waitForClose ();

    React.useEffect (() => {
        return () => closedSubject.next ()
    },[])

    const [inProgress, setInProgress] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>(null);
    const [success, setSuccess] = React.useState<string>(null)

    const { token } = useParams<TokenModel>();

    
    React.useEffect(() => {
        
        CONNECTION.verifyWebRegistration(createVerifyRegisterRequest())
            .do(parseVerifyRegisterResponse)
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error verify in'))
        
    }, [])
    

    const createVerifyRegisterRequest = () : VerifyWebRegistrationRequest => ({ token })
    
    const parseVerifyRegisterResponse = (response : VerifyWebRegistrationResponse) => {

        if (response.expired) {
            handlePlainErrorResponse('Ссылка устарела')
        }
        else if (response.invalidToken) {
            handlePlainErrorResponse('Неверная ссылка')
        }
        else if (response.success) {
            handleSuccessResponse(response)
        }
    }

    const handleSuccessResponse = (response : VerifyWebRegistrationResponse) => {
        tokenController.setToken(response.success.token);
        setSuccess(prev => prev = 'Верификация успешно пройдена');
        setInProgress(prev => prev = false);
    }

    const handlePlainErrorResponse = (error : string) => {
        setError(prev => prev = error)
        setInProgress(prev => prev = false);
    }


    const showInProgress = () => {
        if (inProgress) {
            return <Spinner className='verify-spinner' />
        }
    }

    const showResponse = (value : string) => {
        if (value) {
            return (
                <>
                    <div className="success">{value}</div>
                    <div onClick={backToMainPage} className="back-to-main-button">
                        <div className="back-to-main-text">Назад</div>
                    </div>
                </>
            )
        }
    }

    const backToMainPage = () => STATE_API.hideAuthWizard();

    return (
        <div className="VerifyDialog" onClick={e => e.stopPropagation()}>
            {showInProgress()}
            {showResponse(success)}
            {showResponse(error)}
        </div>
    )
}
