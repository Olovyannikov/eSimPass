import { Action } from "@glonassmobile/codebase-web/Action";
import { createAction } from "./createAction";
import { State, Device } from "../State";
import { INITIAL_STATE } from "../StateApi";

export const deleteDeviceCode = 'deleteDevice';

export const deleteDeviceAction = (device : Device) => createAction(deleteDeviceCode, device);

export const doDeleteDevice = (state = INITIAL_STATE, action : Action<Device>) : State => ({
    ...state,
    privateWizard : {
        stage : 'deleteDevice',
        device : action.payload
    }
})
