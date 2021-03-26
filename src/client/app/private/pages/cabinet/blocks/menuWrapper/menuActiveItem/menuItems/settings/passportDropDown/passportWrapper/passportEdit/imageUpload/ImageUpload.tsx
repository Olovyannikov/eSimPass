import * as React from 'react';

import { PassportStateModel } from '../../PassportWrapper';
import { Buffer } from 'buffer';

interface ImageUploadModel {
    setPassportImage : React.Dispatch<React.SetStateAction<PassportStateModel>>;
    passportImage : Buffer;
    disabled? : boolean;
}

export const ImageUpload = (props : ImageUploadModel) => {

    // const [image, setImage] = React.useState(null);

    const inputRef = React.useRef<HTMLInputElement>();


    const handleImagePicker = () => {
        const reader = new FileReader();
        
        reader.readAsDataURL(inputRef.current.files[0])

        reader.onload = () => {

            const result = Buffer.from(String(reader.result));

            props.setPassportImage(prev => ({
                ...prev,
                photo : result
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
            <input onChange={handleImagePicker} ref={inputRef} id='image_uploads' accept=".png, .jpg, .jpeg" type='file' className='input-file' />
        </div>
    )
}


