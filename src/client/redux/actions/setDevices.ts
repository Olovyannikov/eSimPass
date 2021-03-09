import { Action } from "@glonassmobile/codebase/client/Action";
import {createAction} from "@glonassmobile/codebase/client/createAction"
import { ListDevicesResponse } from "../../generated/proto.web";
import { State } from "./../State";
import { INITIAL_STATE } from "./../StateApi";


export const setDevicesCode = 'setDevices';
export const setDeleteDeviceCode = 'setDeleteDevice';

export const setDevicesAction = (devices : ListDevicesResponse.SuccessModel.DeviceModel[]) => createAction(setDevicesCode, devices);
export const setDeleteDeviceAction = (deviceId : string) => createAction(setDeleteDeviceCode, deviceId);

export const doSetDevices = (state = INITIAL_STATE, action : Action<ListDevicesResponse.SuccessModel.DeviceModel[]>) : State => ({
    ...state,
    devices : action.payload
});

export const doSetDeleteDevice = (state = INITIAL_STATE, action : Action<string>) : State => ({
    ...state,
    devices : state.devices.filter((el : ListDevicesResponse.SuccessModel.DeviceModel) => el.deviceId !== action.payload)
})
