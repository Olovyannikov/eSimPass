import * as React from 'react';

interface IConnectQrCode {
    actionText : string;
    stepImg : string;
}

export const ConnectQrCode = ({actionText, stepImg} : IConnectQrCode) => {
    return (
        <div className="ConnectQrCode">
            <div className="connectQrCode__title">Подключение QR кода</div>
            <div className="connectQrCode__text">Всего два шага до получения QR кода</div>
            <img className='connectionQrCode__step-img' src={stepImg} alt="Step"/>
            <div className="connection__action-text">{actionText}</div>
        </div>
    )
}
