import { Logger } from '@glonassmobile/codebase-web/Logger';
import * as React from 'react';

import { CONNECTION } from '../../../../../../../Connection';
import { GetAbonentResponse } from '../../../../../../../generated/proto.web';
import { img_person } from '../../../../../../../resources/images';
import { STORAGE } from '../../../../../../../StorageAdapter';
import { nothingToNull, waitForClose } from '../../../../../../../utils';
import { WithoutPassportData } from './withoutPassportData/WithoutPassportData';
import {useRouter} from 'next/router';
import Link from 'next/link';

export const Navbar = () => {

    const logger = new Logger ('Navbar');
    
    const closedSubject = waitForClose ();


    const [email, setEmail] = React.useState<string>(null);
    const [documentUploaded, setDocumentUploaded] = React.useState<boolean>(null)

    const [abonentInfo, setAbonentInfo] = React.useState<GetAbonentResponse.SuccessModel>({});

    const router = useRouter();

    const handleLogout = () => {
        STORAGE.clear();
        router.push('/');

    }

    React.useEffect(() => {
        STORAGE.getAbonentInfo()
            .concat(CONNECTION.getAbonent({})
                .map(response => response.success))
                .do(info => {
                    if (info) {
                        STORAGE.storeAbonentInfo(info)
                        setAbonentInfo(prev => prev = info)
                    }
                })
                .takeUntil(closedSubject)
                .subscribe(logger.rx.subscribe('Error in receiving abonent info'))

        // STORAGE.getEmail ()
        //     .concat (CONNECTION.getAbonent({})
        //         .map (response => response.success.email )
        //     )
        //     .do(email => {
        //         STORAGE.storeEmail (email)
        //         setEmail(prev => prev = email)

        //     })
        //     .takeUntil(closedSubject)
        //     .subscribe(logger.rx.subscribe('Error in navbar'))


        // STORAGE.getDocumentUploaded()
        //     .concat(CONNECTION.getAbonent({})
        //         .map(response => checkFilledPassportData(response))
        //     )
        //     .do(documentUploaded => {
        //         STORAGE.storeDocumentUploaded(documentUploaded)
        //         setDocumentUploaded(prev => prev = documentUploaded)
        //     })
        //     .takeUntil(closedSubject)
        //     .subscribe(logger.rx.subscribe('Error in navbar'))

            
    }, [])

    const checkFilledPassportData = (response : GetAbonentResponse.SuccessModel) => {
        if (response?.document) {
            return Object.keys(response.document).every(key => nothingToNull(key))
        }
        else {
            return false
        }
    }

    const renderRedAttention = () => checkFilledPassportData(abonentInfo) ? <></> : <WithoutPassportData />;

    return (
        <div className="Navbar">
            <div className="left-nav">
                <Link href='/'>
                    <a className="logo">LOGO</a>
                </Link>
            </div>
            <div className="right-nav">
                <img className='img_person' src={img_person} alt="User"/>
                <div className="email">{abonentInfo.email}</div>
                <div onClick={handleLogout} className="logout">Выйти</div>
            </div>
            {renderRedAttention()}
        </div>
    )
}


