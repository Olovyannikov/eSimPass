import * as React from 'react';
import * as rx from "rxjs"
import * as ro from "rxjs/operators"

import { GetDocumentPhotoRequest, GetDocumentPhotoResponse } from '../../../../../../../../../../../../../generated/proto.web';
import { waitForClose, Logger } from '../../../../../../../../../../../../../utils';
import { CONNECTION } from '../../../../../../../../../../../../../Connection';
import { Spinner } from '../../.../../../../../../../../../../components/spinnerPayment/Spinner';
import { PassportModel } from '../PassportWrapper';

export const ShowPasportImage = (props : PassportModel) => {

    const logger = new Logger('ShowPhotoImage');

    const closedSubject = waitForClose();

    const [inProgress, setInProgress] = React.useState<boolean>(true);
 
    const passportClass = () => props.show ? 'active' : 'disabled';

    const createGetDocumentPhotoRequest = () : GetDocumentPhotoRequest => ({});

    React.useEffect(() => {
        
        CONNECTION.getDocumentPhoto(createGetDocumentPhotoRequest())
            .pipe (
                ro.tap((response) => {

                    if (response.success) {
                        handleSuccessResponse(response)
                    }
                    else if (response.documentIsNotLoaded) {
                        //TODO!
                    }
                }),
                ro.tap(() => setInProgress(prev => prev = false)),
                ro.takeUntil(closedSubject)
            )
            .subscribe(logger.rx.subscribe('Error in device response'))

    }, [])

    const arrayBufferToBase64 = ( response : any ) => {
        let binary = '';
        const bytes = new Uint8Array( response.success.data  );
        const length = bytes.byteLength;

        for (let i = 0; i < length; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }

        // if (binary.includes('/9j/', 0)) {

        //     props.setPassportState(prev => ({
        //         ...prev,
        //         photo : (binary as any) as Buffer
        //     }));
            
        // }
        // else {
            const base64 = btoa( binary );
            props.setPassportState(prev => ({
                ...prev,
                photo : (base64 as any) as Buffer
            }));

        // }
           
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
        if (inProgress) {
            return <Spinner />    
        } 
        else if (props.passportState?.photo) {
            return <img id='passport-image' className='img' src={returnBase64String()} alt="Passport image"/>
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
