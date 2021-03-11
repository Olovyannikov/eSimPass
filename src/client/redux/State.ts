export type SHOW_AUTH_WIZARD_MODE = 'login' | 'register' | 'verify';

export interface State {
    auth? : {
        email? : string;
    },
    showAuthWizard? : SHOW_AUTH_WIZARD_MODE;
}
