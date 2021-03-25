import * as React from 'react';
import { Button } from '../../../../../../../../../components/buttons/Button';
import { PassportEdit } from './passportEdit/PassportEdit';
import { PassportView } from './passportView/PassportView';

interface PassportWrapperModel {
    show : boolean;
}

export type Gender = 'Мужчина' | 'Женщина' | '';

export interface PassportStateModel {
    bornDate? : string;
    gotDate? : string;
    gender? : Gender;
    citizenship? : string;
    series? : string;
    fullName? : string;
    address? : string;
    image? : string;
}

export interface PassportModel {
    toggleMode : React.Dispatch<React.SetStateAction<boolean>>;
    passportState : PassportStateModel;
    setPassportState? : React.Dispatch<React.SetStateAction<PassportStateModel>>;

}

export const PassportWrapper = (props : PassportWrapperModel) => {

    const [passportState, setPassportState] = React.useState<PassportStateModel>({
        bornDate : null,
        gotDate : null,
        citizenship : '',
        series : '',
        fullName : '',
        address : '',
        gender : 'Женщина',
    })

    const passportClass = () => props.show ? 'active' : 'disabled';
    const [mode, setMode] = React.useState<boolean>(true);

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
