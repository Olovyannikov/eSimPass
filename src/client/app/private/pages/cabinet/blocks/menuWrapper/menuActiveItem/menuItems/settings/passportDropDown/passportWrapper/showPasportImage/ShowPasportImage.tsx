import * as React from 'react';

import { GetDocumentPhotoRequest, GetDocumentPhotoResponse } from '../../../../../../../../../../../../generated/proto.web';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { waitForClose } from '../../../../../../../../../../../../utils';
import { CONNECTION } from '../../../../../../../../../../../../Connection';
import { Spinner } from '../../.../../../../../../../../../../components/spinnerPayment/Spinner';
import { PassportModel } from '../PassportWrapper';


export const ShowPasportImage = (props : PassportModel) => {

    const logger = new Logger('ShowPhotoImage');

    const closedSubject = waitForClose();

    const [inProgress, setInProgress] = React.useState<boolean>(true);
 
    const passportClass = () => props.show ? 'active' : 'disabled';

    const createGetDocumentPhotoRequest = () : GetDocumentPhotoRequest => ({})

    React.useEffect(() => {

        CONNECTION.getDocumentPhoto(createGetDocumentPhotoRequest())
            .do((response) => {

                if (response.success) {
                    handleSuccessResponse(response)
                }
                else if (response.documentIsNotLoaded) {
                    //TODO!
                }
            })
            .do(() => setInProgress(prev => prev = false))
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in device response'))

    }, [])

    const arrayBufferToBase64 = ( response : any ) => {
        let binary = '';
        const bytes = new Uint8Array( response.success.data  );
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
            const base64 = btoa( binary );
            props.setPassportState(prev => ({
                ...prev,
                photo : (base64 as any) as Buffer
            }));
    }

    const handleSuccessResponse = (response : GetDocumentPhotoResponse) => {        
        
        arrayBufferToBase64(response)
    }

    const returnBase64String = () => {
        if (props.passportState.photo) {
            return `data:image/jpeg;base64,${props.passportState.photo}`;
        }
    }

    const renderImage = () => {
        // TODO! Check props
        if (inProgress) {
            return <Spinner />    
        } 
        else if (props.passportState?.photo) {
            return <img className='img' src={returnBase64String()} alt="Passport"/>
        }
        else if (!inProgress && !props.passportState?.photo) {
            return <div className="attention">Фотография паспорта отсутствует!</div>
        }
    }

    return (
        <div className={`ShowPasportImage ${passportClass()}`}>
            {renderImage()}
        </div>
    )
}
