export type SHOW_PUBLIC_WIZARD_MODE = 'login' | 'register' | 'verify';
export type SHOW_PRIVATE_WIZARD_MODE = 'waitForPayment' | 'deleteDevice';

export interface State {
    auth? : {
        email? : string;
    },
    publicWizard? : SHOW_PUBLIC_WIZARD_MODE;
    privateWizard? : SHOW_PRIVATE_WIZARD_MODE;
}
