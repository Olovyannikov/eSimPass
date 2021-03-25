import * as React from 'react';

import { PassportStateModel } from '../../PassportWrapper';

interface ImageUploadModel {
    setPassportImage : React.Dispatch<React.SetStateAction<PassportStateModel>>;
    passportImage : string;
}

export const ImageUpload = (props : ImageUploadModel) => {

    // const [image, setImage] = React.useState(null);

    const inputRef = React.useRef<HTMLInputElement>();


    const handleImagePicker = () => {
        const reader = new FileReader();
        console.log(inputRef.current.files);
        
        reader.readAsDataURL(inputRef.current.files[0])

        reader.onload = () => {
            props.setPassportImage(prev => ({
                ...prev,
                image : String(reader.result)
            }))
        }

        reader.onerror = (error) => {
            console.error('Error: ', error);
        };
        
    }

    const handleImageDownload = () => props.passportImage ? 'Фотография загружена!' : 'Загрузите фотографию паспорта';

    return (
        <div className="ImageUpload">
            <label className='button-download' htmlFor="image_uploads"><div>{handleImageDownload()}</div></label>
            <input onChange={handleImagePicker} ref={inputRef} id='image_uploads' accept=".png, .jpg, .jpeg" type='file' className='input-file' />
        </div>
    )
}


