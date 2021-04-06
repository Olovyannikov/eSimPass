import * as React from 'react';
import { FAQ } from './FAQ/FAQ';
import { Chat } from './chat/Chat';

export const Support = () => {

    return (
        <div className="Support">
            <Chat />
            <FAQ />
        </div>
    )
}
