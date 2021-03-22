export type SHOW_PUBLIC_WIZARD_MODE = 'login' | 'register' | 'verifyRegistration' | 'passwordRestore' | 'verifyPasswordRestore';
export type SHOW_PRIVATE_WIZARD_MODE = 'waitForPayment' | 'deleteDevice' | 'addDevice' | 'buyQrCode';

export interface Device {
    deviceId : string;
    deviceName : string;
}

export interface PrivateWizard {
    stage? : SHOW_PRIVATE_WIZARD_MODE;
    device? : Device;
}

export interface State {
    auth? : {
        email? : string;
    },
    publicWizard? : SHOW_PUBLIC_WIZARD_MODE;
    privateWizard? : PrivateWizard
}
