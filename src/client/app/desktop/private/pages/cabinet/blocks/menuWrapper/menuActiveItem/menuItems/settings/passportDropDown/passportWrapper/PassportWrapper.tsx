import { Logger } from '@glonassmobile/codebase-web/Logger';
import * as React from 'react';
import { CONNECTION } from '../../../../../../../../../../../../Connection';

import { GetAbonentResponse, SetDocumentRequest } from '../../../../../../../../../../../../generated/proto.web';
import { waitForClose } from '../../../../../../../../../../../../utils';
import { PassportEdit } from './passportEdit/PassportEdit';
import { PassportView } from './passportView/PassportView';
import { ShowPasportImage } from './showPasportImage/ShowPasportImage';


interface PassportWrapperModel {
    show : boolean;
}

export type Gender = 'Мужчина' | 'Женщина' | '';

export interface PassportStateModel extends SetDocumentRequest {}

export interface PassportModel {
    toggleMode? : React.Dispatch<React.SetStateAction<boolean>>;
    passportState : PassportStateModel;
    setPassportState? : React.Dispatch<React.SetStateAction<PassportStateModel>>;
    show? : boolean;
}

export const PassportWrapper = (props : PassportWrapperModel) => {

    const logger = new Logger('Passport wrapper');

    const closedSubject = waitForClose();
    
    const [mode, setMode] = React.useState<boolean>(true);

    React.useEffect(() => {

        CONNECTION.getAbonent(createGetAbonentPassportRequest())
            .do(response => {
                if (response.success) {
                    setPassportState(prev =>({
                        ...prev,
                        ...response.success.document
                    }));
                }
            })
            .takeUntil(closedSubject)
            .subscribe(logger.rx.subscribe('Error in get abonent passport response'))

    }, [])

    const createGetAbonentPassportRequest = () : GetAbonentResponse => ({});

    const [passportState, setPassportState] = React.useState<PassportStateModel>({
        birhday : null,
        issueDate : null,
        sn : '',
        fio : '',
        address : '',
        phone : '',
        photo : null,
    })
    
    const passportClass = () => props.show ? 'active' : 'disabled';

    const doRender = () => {

        if (mode) {
            return <PassportEdit passportState={passportState} setPassportState={setPassportState} toggleMode={setMode} />
        }
        else {
            return <PassportView passportState={passportState} toggleMode={setMode} />
        }
    }

    return (
        <div className='PassportWrapper'>
            <div className={`passport-block ${passportClass()}`}>
                {doRender()}
            </div>
            <ShowPasportImage setPassportState={setPassportState} passportState={passportState} show={props.show} />
        </div>
    )
}
