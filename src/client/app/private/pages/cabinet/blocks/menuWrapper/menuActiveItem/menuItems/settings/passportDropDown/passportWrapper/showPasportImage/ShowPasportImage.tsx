import * as React from 'react';

import { GetDocumentPhotoRequest } from '../../../../../../../../../../../../generated/proto.web';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { waitForClose } from '../../../../../../../../../../../../utils';
import { CONNECTION } from '../../../../../../../../../../../../Connection';
import { Spinner } from '../../.../../../../../../../../../../components/spinnerPayment/Spinner';


interface ShowPasportImageModel {
    show : boolean;
    img : Buffer;
}

export const ShowPasportImage = (props : ShowPasportImageModel) => {

    const logger = new Logger('ShowPhotoImage');

    const closedSubject = waitForClose();

    const [photo, setPhoto] = React.useState<string>(null);
    const [inProgress, setInProgress] = React.useState<boolean>(true);
 
    const passportClass = () => props.show ? 'active' : 'disabled';

    const createGetDocumentPhotoRequest = () : GetDocumentPhotoRequest => ({})

    React.useEffect(() => {


        CONNECTION.getDocumentPhoto(createGetDocumentPhotoRequest())
            .do(response => {
                console.log(response);
                
                if (response.success) {
                    // let buffer = new Uint8Array(response.success).buffer
                    
                    // console.log(buffer);
                    // let base64String = btoa(String.fromCharCode.apply(null, buffer));
                    // console.log(base64String);
                    
                    // setPhoto(prev => prev = base64String)
                    // console.log(`data:image/jpeg;base64,${base64String}`);
                    // console.log('response',response.success);
                    
                    // const buffer = new Uint8Array(response.success.data)

            
                    // const base64String = btoa(String.fromCharCode.apply(null, buffer));
                    // console.log(`data:image/jpeg;base64,${base64String}`);
                    
                    // setPhoto(prev => prev = `data:image/jpeg;base64,${base64String}`) 
                    
                }
                else if (response.documentIsNotLoaded) {
                    
                }
            })
            .do(() => setInProgress(prev => prev = false))
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in device response'))

    }, [])

    const convertBufferToBase64 = () => {
        if (props.img) {
            const buffer = new Uint8Array(props.img)
            const base64String = btoa(String.fromCharCode.apply(null, buffer));
            return `data:image/jpeg;base64,${base64String}`
        }
    }

    const renderImage = () => {

        if (inProgress) {
            return <Spinner />    
        } 
        else if (!inProgress && !props.img) {
            return <div className="attention">Фотография паспорта отсутствует!</div>
        }
        else {
            return <img className='img' src={convertBufferToBase64()} alt="Passport"/>
        }
    }

    return (
        <div className={`ShowPasportImage ${passportClass()}`}>
            {renderImage()}
        </div>
    )
}
