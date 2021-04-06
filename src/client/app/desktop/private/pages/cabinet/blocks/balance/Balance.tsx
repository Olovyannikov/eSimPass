import * as React from 'react';

import { CurrentBalance } from './current/CurrentBalance';
import { TopUpBalance } from './topUp/TopUpBalance';

export const Balance = () => {
    return (
        <div className="Balance">
            <CurrentBalance />
            <TopUpBalance />
        </div>
    )
}
