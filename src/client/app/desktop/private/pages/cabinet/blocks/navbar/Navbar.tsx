import * as React from 'react';
import * as rx from "rxjs"
import * as ro from "rxjs/operators"

import { CONNECTION } from '../../../../../../../Connection';
import { GetAbonentResponse } from '../../../../../../../generated/proto.web';
import { img_cabinetLogo, img_person } from '../../../../../../../resources/images';
import { STORAGE } from '../../../../../../../StorageAdapter';
import { nothingToNull, waitForClose, Logger } from '../../../../../../../utils';
import { WithoutPassportData } from './withoutPassportData/WithoutPassportData';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Navbar = () => {

    const logger = new Logger ('Navbar');
    
    const closedSubject = waitForClose ();

    const [abonentInfo, setAbonentInfo] = React.useState<GetAbonentResponse.SuccessModel>({});

    const [isMounted, setIsMounted] = React.useState<boolean>(false)

    const router = useRouter();

    const handleLogout = () => {
        STORAGE.clear();
        router.push('/');
    }

    React.useEffect(() => {
        rx.concat (
            STORAGE.getAbonentInfo(),
            CONNECTION.getAbonent({})
                .pipe (
                    ro.map(response => response.success),
                    ro.tap(info => {
                        if (info) {
                            STORAGE.storeAbonentInfo(info)
                            setAbonentInfo(prev => prev = info)
                        }
                    }),
                    ro.takeUntil(closedSubject)
                )
        )
        .subscribe(logger.rx.subscribe('Error in receiving abonent info'))

            setIsMounted(true)
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
                    <img src={img_cabinetLogo} alt='eSIM' className="logo" />
                </Link>
            </div>
            <div className="right-nav">
                <img className='img_person' src={img_person} alt="User"/>
                <div className="email">{abonentInfo.email}</div>
                <div onClick={handleLogout} className="logout">Выйти</div>
            </div>
            {isMounted && renderRedAttention()}
        </div>
    )
}


