import * as React from 'react';

import { GetDocumentPhotoRequest } from '../../../../../../../../../../../../generated/proto.web';
import { Logger } from '@glonassmobile/codebase-web/Logger';
import { waitForClose } from '../../../../../../../../../../../../utils';
import { CONNECTION } from '../../../../../../../../../../../../Connection';


interface ShowPasportImageModel {
    show : boolean;
    img : Buffer;
}

export const ShowPasportImage = (props : ShowPasportImageModel) => {

    const logger = new Logger('ShowPhotoImage');

    const closedSubject = waitForClose();

    const [photo, setPhoto] = React.useState<string>(null);
 
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
                    // setPhoto(prev => prev = base64String)
                    // console.log(`data:image/jpeg;base64,${base64String}`);
                    
                }
                else if (response.documentIsNotLoaded) {
                    
                }
            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in device response'))

    }, [])

    // React.useEffect(() => {
    //     convertBufferToString()

    // }, [])

    const convertBufferToString = () => {
        if (photo) {
            // let blob = new Blob([photo], {'type' : 'image/jpeg'})
            // let urlCreator = window.URL || window.webkitURL;
            // let imageUrl = urlCreator.createObjectURL(blob);
            // imgRef.current.src = imageUrl

            
            // console.log(`data:image/jpeg;base64,${Base64.fromUint8Array(photo.data)}`);
            // {`data:image/jpeg;base64,/9j/${photo}`}
            // return `data:image/jpeg;base64,${Base64.fromUint8Array(photo.data)}`
            
            // return imageUrl
        }
    }

    const renderImage = () => {
        if (props.img) {

            const buffer = new Uint8Array(props.img)
            
            const base64String = btoa(String.fromCharCode.apply(null, buffer));
            return `data:image/jpeg;base64,${base64String}`
        }
        else {

        }
    }

    const imgRef = React.useRef<HTMLImageElement>();

    return (
        <div className={`ShowPasportImage ${passportClass()}`}>
            <img className='img' src={renderImage()} alt=""/>

        </div>
    )
}
