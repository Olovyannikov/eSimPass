import { ListDevicesResponse } from '../generated/proto.web';
import { MenuItems } from './StateApi';

export type Modals = 'registration' | 'deleteDevice' | 'login' | 'topUpQr';

export interface State {
    auth? : {
        verify? : boolean;
        login? : string;
    },
    modal? : Modals | '';
    menu? : MenuItems;
    devices? : ListDevicesResponse.SuccessModel.DeviceModel[]
}
