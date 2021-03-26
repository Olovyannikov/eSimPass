import * as React from 'react';

import { SetDocumentRequest } from '../../../../../../../../../../../generated/proto.web';
import { Button } from '../../../../../../../../../components/buttons/Button';
import { PassportEdit } from './passportEdit/PassportEdit';
import { PassportView } from './passportView/PassportView';
import { Buffer } from 'buffer';


interface PassportWrapperModel {
    show : boolean;
}

export type Gender = 'Мужчина' | 'Женщина' | '';

export interface PassportStateModel {
    birhday? : string;
    issueDate? : string;
    // gender? : Gender;
    // citizenship? : string;
    sn? : string;
    fio? : string;
    address? : string;
    photo? : Buffer;
}

export interface PassportModel {
    toggleMode : React.Dispatch<React.SetStateAction<boolean>>;
    passportState : PassportStateModel;
    setPassportState? : React.Dispatch<React.SetStateAction<PassportStateModel>>;

}

export const PassportWrapper = (props : PassportWrapperModel) => {

    const [passportState, setPassportState] = React.useState<PassportStateModel>({
        birhday : null,
        issueDate : null,
        // citizenship : '',
        sn : '',
        fio : '',
        address : '',
        // gender : 'Женщина',
    })
    const [mode, setMode] = React.useState<boolean>(true);
    
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
        <div className={`PassportWrapper ${passportClass()}`}>
            {doRender()}
        </div>
    )
}
