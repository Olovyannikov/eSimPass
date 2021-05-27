import * as React from 'react';

import { Spinner } from '../../../components/spinner/Spinner';
import {VerifyWebRegistrationRequest, VerifyWebRegistrationResponse } from '../../../../../../generated/proto.web';
import { CONNECTION } from '../../../../../../Connection';
import { waitForClose, Logger } from '../../../../../../utils';
import { STORAGE } from '../../../../../../StorageAdapter';
import { STATE_API } from '../../../../../../redux/StateApi';
import Router, { useRouter } from 'next/router';

export const VerifyRegistrationDialog = () => {

    const logger = new Logger ('VerifyRegistrationDialog');

    const closedSubject = waitForClose ();

    const [inProgress, setInProgress] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>(null);
    const [success, setSuccess] = React.useState<string>(null);

    const router = useRouter();
    const { tokenVerify } : any = router.query
    const token = tokenVerify

    React.useEffect(() => {
            
        if (!token) {
            return null
        }

        CONNECTION.verifyWebRegistration(createVerifyRegisterRequest())
            .do(parseVerifyRegisterResponse)
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error verify in'))
        
    }, [token])
    

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
        STORAGE.setToken(response.success.token);
        hideWizard()
        Router.push('/cabinet');
        // setSuccess(prev => prev = 'Верификация успешно пройдена');
        // setInProgress(prev => prev = false);
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
                    <div onClick={hideWizard} className="back-to-main-button">
                        <div className="back-to-main-text">Назад</div>
                    </div>
                </>
            )
        }
    }

    const hideWizard = () => STATE_API.hideAuthWizard();

    return (
        <div className="VerifyRegistrationDialog" onClick={e => e.stopPropagation()}>
            {showInProgress()}
            {showResponse(success)}
            {showResponse(error)}
        </div>
    )
}
