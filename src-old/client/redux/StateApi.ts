import { Store } from "redux";
import { createStore } from "redux";
import { doSetAuthenticated, setAuthenticatedCode, setAuthenticatedAction, setLogoutCode, doSetLogout, setLogoutAction } from "./actions/setAuthenticated";
import { setModalCloseCode, setModalCloseAction, doSetModalClose, doSetModal, setModalAction, setModalCode  } from './actions/setModal';
import { doSetMenuItem, setMenuItemCode, setMenuItemAction } from './actions/setMenuItem';
import { doSetDeleteDevice, setDeleteDeviceCode, setDeleteDeviceAction, setDevicesCode, doSetDevices, setDevicesAction } from './actions/setDevices';
import { State, Modals } from "./State";
import { Action } from "@glonassmobile/codebase/client/Action";

export type MenuItems = 'devices' | 'detail' | 'change' | 'loyalty' | 'support' | 'settings';

export const INITIAL_STATE : State = {
    auth : {},
    modal : '',
    menu : "devices",
    devices : []
}

const reducersMap = {};

reducersMap [setMenuItemCode] = doSetMenuItem;
reducersMap [setModalCode] = doSetModal;
reducersMap [setModalCloseCode] = doSetModalClose;
reducersMap [setAuthenticatedCode] = doSetAuthenticated;
reducersMap [setLogoutCode] = doSetLogout;
reducersMap [setDeleteDeviceCode] = doSetDeleteDevice;
reducersMap [setDevicesCode] = doSetDevices;

const reducer = (state = INITIAL_STATE, action: Action<any>) : State => {

    const actionReducer = reducersMap[action.type]

    console.log('PAYLOAD',action.payload)
    console.log('TYPE',action.type)

    if (actionReducer) {
        return actionReducer (state, action);
    }
    else {
        return state;
    }
}

export const STORE = createStore(reducer);

export const createDispatcher = (store : Store<State, any>) => ({
    setAuthenticated : (login : string) => store.dispatch (setAuthenticatedAction (login)),
    setLogout : () => store.dispatch(setLogoutAction()),
    setModal : (modal : Modals) => store.dispatch(setModalAction(modal)),
    setModalClose : () => store.dispatch(setModalCloseAction()),
    setMenuItem : (menuItem : MenuItems) => store.dispatch(setMenuItemAction(menuItem)),
    setDeleteDevice : (deviceId : string) => store.dispatch(setDeleteDeviceAction(deviceId)),
    setDevices : (devices : any) => store.dispatch(setDevicesAction(devices))
})

export const STATE_API = createDispatcher (STORE)

