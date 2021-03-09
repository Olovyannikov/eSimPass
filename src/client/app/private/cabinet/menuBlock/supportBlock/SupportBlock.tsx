import * as React from 'react';
import { ChatBlock } from './chatBlock/ChatBlock';
import { FAQ } from './FAQ/FAQ';

export const SupportBlock = () => {
    return (
        <div className="SupportBlock">
            <ChatBlock />
            <FAQ />
        </div>
    )
}
