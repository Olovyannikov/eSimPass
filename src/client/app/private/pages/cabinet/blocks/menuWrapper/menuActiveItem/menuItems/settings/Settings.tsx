import * as React from 'react';

import { EntrySetting } from './entrySetting/EntrySetting';
import { PassportData } from './passportData/PassportData';

export const Settings = () => {
    return (
        <div className="Settings">
            <PassportData />
            <EntrySetting />
        </div>
    )
}
