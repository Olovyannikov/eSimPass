import { ListDevicesResponse, ListRatesResponse } from "../generated/proto.web";

export type SHOW_PUBLIC_WIZARD_MODE = 'login' | 'register' | 'verifyRegistration' | 'passwordRestore' | 'verifyPasswordRestore' | 'checkDevice';
export type SHOW_PRIVATE_WIZARD_MODE = 'waitForPayment' | 'deleteDevice' | 'addDevice' | 'buyQrCode' | 'buyPack' | 'connectQrCode';

export interface Device {
    deviceId : string;
    deviceName : string;
}

export interface BuyPackWizard {
    device : ListDevicesResponse.SuccessModel.DeviceModel
}

export interface PrivateWizard {
    stage? : SHOW_PRIVATE_WIZARD_MODE;
    device? : Device;
    pack? : BuyPackWizard;
}

export interface State {
    auth? : {
        email? : string;
    },
    publicWizard? : SHOW_PUBLIC_WIZARD_MODE;
    privateWizard? : PrivateWizard;
    listRates? : ListRatesResponse.SuccessModel.RateModel[];
}
