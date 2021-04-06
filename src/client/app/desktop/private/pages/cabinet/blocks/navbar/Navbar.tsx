import { Logger } from '@glonassmobile/codebase-web/Logger';
import * as React from 'react';

import { Link } from 'react-router-dom';
import { CONNECTION } from '../../../../../../../Connection';
import { GetAbonentResponse } from '../../../../../../../generated/proto.web';
import { img_person } from '../../../../../../../resources/images';
import { STORAGE } from '../../../../../../../StorageAdapter';
import { nothingToNull, waitForClose } from '../../../../../../../utils';
import { WithoutPassportData } from './withoutPassportData/WithoutPassportData';

export const Navbar = () => {

    const logger = new Logger ('Navbar');
    
    const closedSubject = waitForClose ();

    const [email, setEmail] = React.useState<string>(null);
    const [documentUploaded, setDocumentUploaded] = React.useState<boolean>(null)

    const handleLogout = () => {
        STORAGE.deleteToken();
        window.location.reload();
    }

    React.useEffect(() => {

        STORAGE.getEmail ()
            .concat (CONNECTION.getAbonent({})
                .map (response => response.success.email)
            )
            .do(email => {
                STORAGE.storeEmail (email)
                setEmail(prev => prev = email)

            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in navbar'))


        STORAGE.getDocumentUploaded()
            .concat(CONNECTION.getAbonent({})
                .map(response => checkFilledPassportData(response))
            )
            .do(documentUploaded => {
                STORAGE.storeDocumentUploaded(documentUploaded)
                setDocumentUploaded(prev => prev = documentUploaded)
            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in navbar'))

            
    }, [])

    const checkFilledPassportData = (response : GetAbonentResponse) => {
        if (response.success?.document) {
            return Object.keys(response.success.document).every(key => nothingToNull(key))
        }
        else {
            return false
        }
    }

    const renderRedAttention = () => documentUploaded ? <></> : <WithoutPassportData />;

    return (
        <div className="Navbar">
            <div className="left-nav">
                <Link className="logo" to='/'>LOGO</Link>
            </div>
            <div className="right-nav">
                <img className='img_person' src={img_person} alt="User"/>
                <div className="email">{email}</div>
                <div onClick={handleLogout} className="logout">Выйти</div>
            </div>
            {renderRedAttention()}
        </div>
    )
}
