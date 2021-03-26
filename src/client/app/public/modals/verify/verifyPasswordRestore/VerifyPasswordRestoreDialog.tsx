import * as React from 'react';

import { Logger } from '@glonassmobile/codebase-web/Logger';
import { useParams } from 'react-router-dom';
import { CONNECTION } from '../../../../../Connection';
import { VerifyPasswordRestoreRequest, VerifyPasswordRestoreResponse } from '../../../../../generated/proto.web';
import { STATE_API } from '../../../../../redux/StateApi';
import { STORAGE } from '../../../../../StorageAdapter';
import { waitForClose } from '../../../../../utils';
import { Spinner } from '../../../components/spinner/Spinner';
import { TokenModel } from '../../../PublicApplication';

export const VerifyPasswordRestoreDialog = () => {

    const logger = new Logger('Verify password restore dialog');

    const closedSubject = waitForClose();

    const [inProgress, setInProgress] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>(null);
    const [success, setSuccess] = React.useState<string>(null);

    const { tokenRestore } = useParams<TokenModel>();
    const verificationToken = tokenRestore;

    React.useEffect(() => {
        console.log(tokenRestore);

        CONNECTION.verifyPasswordRestore(createVerifyPasswordRestoreRequest())
        .do(parseVerifyPasswordRestoreResponse)
        .takeUntil(closedSubject)
        .subscribe(logger.rx.subscribe('Error verify in'))
        
    }, [])

    const createVerifyPasswordRestoreRequest = () : VerifyPasswordRestoreRequest => ({ verificationToken })

    const parseVerifyPasswordRestoreResponse = (response : VerifyPasswordRestoreResponse) => {
        if (response.success) {
            handleSuccessResponse(response)
        }
        else if (response.invalidToken) {
            handlePlainErrorResponse('Неверная ссылка')
        }
        else if (response.expired) {
            handlePlainErrorResponse('Сcылка устарела')
        }
    }

    const handleSuccessResponse = (response : VerifyPasswordRestoreResponse) => {
        STORAGE.setToken(response.success.token);
        setSuccess(prev => prev = 'Пароль изменен');
        setInProgress(prev => prev = false);
    }

    const handlePlainErrorResponse = (error : string) => {
        setError(prev => prev = error);
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
        <div className="VerifyPasswordRestoreDialog" onClick={(e) => e.stopPropagation()}>
            {showInProgress()}
            {showResponse(success)}
            {showResponse(error)}
        </div>
    )
}
