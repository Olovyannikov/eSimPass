import { Logger } from '@glonassmobile/codebase-web/Logger';
import * as React from 'react';

import { Link } from 'react-router-dom';
import { CONNECTION } from '../../../../../../Connection';
import { img_person } from '../../../../../../resources/images';
import { STORAGE } from '../../../../../../StorageAdapter';
import { waitForClose } from '../../../../../../utils';
import { WithoutPassportData } from './withoutPassportData/WithoutPassportData';

export const Navbar = () => {

    const logger = new Logger ('RegistrationDialog');
    
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
                .map(response => response.success.documentUploaded)
            )
            .do(documentUploaded => {
                STORAGE.storeDocumentUploaded(documentUploaded)
                setDocumentUploaded(prev =>prev = documentUploaded)
            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in navbar'))

    }, [])

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
