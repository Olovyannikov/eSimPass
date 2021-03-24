import * as React from 'react';

import { EntrySetting } from './entrySetting/EntrySetting';
import { PassportDropDown } from './passportDropDown/PassportDropDown';

export const Settings = () => {
    return (
        <div className="Settings">
            <PassportDropDown />
            <EntrySetting />
        </div>
    )
}
