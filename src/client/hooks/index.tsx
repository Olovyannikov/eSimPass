import * as React from 'react';
import * as rx from 'rxjs';
import { STATE_API } from '../redux/StateApi';


export const useOnClickOutside = (ref : React.RefObject<HTMLDivElement>, handler: (e : any) => void) => {
    React.useEffect(
        () => {
            const listener = (event : any) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                const modal = document.getElementsByClassName('Modals')[0]
                modal.classList.remove('active');
                STATE_API.setModalClose()
                handler(event)
            }
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
      
            return () => {
              document.removeEventListener('mousedown', listener);
              document.removeEventListener('touchstart', listener);
            };
        }
    )
}
