import * as React from 'react';

import { PassportStateModel } from '../../PassportWrapper';

interface ImageUploadModel {
    setPassportImage : React.Dispatch<React.SetStateAction<PassportStateModel>>;
    passportImage : Buffer;
    disabled? : boolean;
}



// Polyfill for canvas.toBlob
if (typeof window !== 'undefined') {
    if (!window.HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
          value: function (callback : any, type : any, quality : any) {
            var dataURL = this.toDataURL(type, quality).split(',')[1];
            setTimeout(function() {
      
              var binStr = atob( dataURL ),
                  len = binStr.length,
                  arr = new Uint8Array(len);
      
              for (var i = 0; i < len; i++ ) {
                arr[i] = binStr.charCodeAt(i);
              }
      
              callback( new Blob( [arr], {type: type || 'image/jpeg'} ) );
      
            });
          }
        });
      }
}
// polyfill for Uint8Array.reduce
if (!Uint8Array.prototype.reduce) {
    Object.defineProperty(Uint8Array.prototype, 'reduce', {
      value: function(callback : any /*, initialValue*/) {
        if (this === null) {
          throw new TypeError( 'Array.prototype.reduce ' +
            'called on null or undefined' );
        }
        if (typeof callback !== 'function') {
          throw new TypeError( callback +
            ' is not a function');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        var k = 0;
        var value;
        if (arguments.length >= 2) {
          value = arguments[1];
        } else {
          while (k < len && !(k in o)) {
            k++;
          }
          if (k >= len) {
            throw new TypeError( 'Reduce of empty array ' +
              'with no initial value' );
          }
          value = o[k++];
        }
        while (k < len) {
          if (k in o) {
            value = callback(value, o[k], k, o);
          }
          k++;
        }
        return value;
      }
    });
  }

export const ImageUpload = (props : ImageUploadModel) => {

    const inputRef = React.useRef<HTMLInputElement>();

    const handleImagePicker = () => {
        const reader = new FileReader();

        // reader.readAsArrayBuffer(inputRef.current.files[0])

        const blobUrl = window.URL.createObjectURL(inputRef.current.files[0]);
        
        const img = new Image()
        img.src = blobUrl;
        img.onerror = function () {
            URL.revokeObjectURL(this.src)
            console.warn('Cannot load image');
        }

        const calculateSizeImg = () => {
            let width = img.width
            let height = img.height
            const maxWidth = 350
            const maxHeight = 180

            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width)
                    width = maxWidth
                }
            }
            else {
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height)
                    height = maxHeight
                }
            }
            return [width, height]
        }

        img.onload = function () {
            const [newWidth, newHeight] = calculateSizeImg()
            const canvas = document.createElement('canvas')
            canvas.width = newWidth
            canvas.height = newHeight
            const ctx = canvas.getContext('2d')
            
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            canvas.toBlob((blob) => {
                    reader.readAsArrayBuffer(blob) 
                    
                    reader.onload = () => {
                        const result = reader.result as ArrayBufferLike
                        const base64String = btoa(new Uint8Array(result).reduce(function (data,byte) {
                            return data + String.fromCharCode(byte)
                        }, ''))
                         
                        props.setPassportImage(prev => ({
                            ...prev,
                            photo : (base64String as any) as Buffer
                        }))

                    }
                // })

                // const displayInfo = () => {
                //     const i = Math.floor(Math.log(blob.size) / Math.log(1024))
                //     const sizes = ['B', 'KB', 'MB', 'GB'];
                    
                //     console.log((inputRef.current.files[0].size / Math.pow(1024, i)).toFixed(2) + '' + sizes[i]);
                //     console.log((blob.size / Math.pow(1024, i)).toFixed(2) + '' + sizes[i]);
                //     // console.log((.size / Math.pow(1024, i)).toFixed(2) + '' + sizes[i]);
                
                // }
                // displayInfo()
                
            }, 'image/jpeg', 0.7)


            
        }
            
            // const result : ArrayBufferLike = reader.result as ArrayBufferLike;
            
            
            // const buffer = new Uint8Array(result);
            
            // const base64String = btoa(String.fromCharCode.apply(null, buffer));

            // const base64String = btoa(new Uint8Array(result).reduce(function (data,byte) {
            //     return data + String.fromCharCode(byte)
            // }, '' ))
            
            // props.setPassportImage(prev => ({
            //     ...prev,
            //     photo : (base64String as any) as Buffer
            // }))

        // }

        // reader.onerror = (error) => {
        //     console.error('Error: ', error);
        // };
        
    }

    const handleImageDownload = () => props.passportImage ? 'Фотография загружена!' : 'Загрузите фотографию паспорта';

    return (
        <div className="ImageUpload">
            <label aria-disabled={props.disabled} className='button-download' htmlFor="image_uploads"><div>{handleImageDownload()}</div></label>
            <input onChange={handleImagePicker} ref={inputRef} id='image_uploads' accept=".jpeg" type='file' className='input-file' />
        </div>
    )
}


