import * as React from 'react';
import { Button } from '../../../../../../../../../components/buttons/Button';
import { PassportEdit } from './passportEdit/PassportEdit';
import { PassportView } from './passportView/PassportView';

interface PassportWrapperModel {
    show : boolean;
}

export interface PassportModel {
    toggleMode : React.Dispatch<React.SetStateAction<boolean>>;
}

export const PassportWrapper = (props : PassportWrapperModel) => {

    const passportClass = () => props.show ? 'active' : 'disabled';
    const [mode, setMode] = React.useState<boolean>(true);

    const doRender = () => {
        if (mode) {
            return <PassportEdit toggleMode={setMode} />
        }
        else {
            return <PassportView toggleMode={setMode} />
        }
    }

    return (
        <div className={`PassportWrapper ${passportClass()}`}>
            {doRender()}
        </div>
    )
}
