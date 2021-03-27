import * as React from 'react';

import { PassportStateModel } from '../../PassportWrapper';

interface ImageUploadModel {
    setPassportImage : React.Dispatch<React.SetStateAction<PassportStateModel>>;
    passportImage : Buffer;
    disabled? : boolean;
}

export const ImageUpload = (props : ImageUploadModel) => {

    const inputRef = React.useRef<HTMLInputElement>();

    const handleImagePicker = () => {
        const reader = new FileReader();
        
        reader.readAsArrayBuffer(inputRef.current.files[0])

        reader.onload = () => {
            
            const result : ArrayBufferLike = reader.result as ArrayBufferLike
            
            const buffer = new Uint8Array(result)
            
            // let base64String = btoa(String.fromCharCode.apply(null, buffer));

            // console.log(`data:image/jpeg;base64,${base64String}`);
            
            props.setPassportImage(prev => ({
                ...prev,
                photo : (buffer.buffer as any) as Buffer
            }))

        }

        reader.onerror = (error) => {
            console.error('Error: ', error);
        };
        
    }

    const handleImageDownload = () => props.passportImage ? 'Фотография загружена!' : 'Загрузите фотографию паспорта';

    return (
        <div className="ImageUpload">
            <label aria-disabled={props.disabled} className='button-download' htmlFor="image_uploads"><div>{handleImageDownload()}</div></label>
            <input onChange={handleImagePicker} ref={inputRef} id='image_uploads' accept=".jpeg" type='file' className='input-file' />
        </div>
    )
}


