import { Store } from "redux";
import { createStore } from "redux";
import { doSetAuthenticated, setAuthenticatedCode, setAuthenticatedAction } from "./actions/setAuthenticated";
import { doPublicWizard, publicWizardCode, publicWizardAction } from './actions/showPublicWizard';
import { hideAuthWizardCode, doHideAuthWizard, hideAuthWizardAction } from './actions/hideAuthWizard';
import { doPrivateWizard, privateWizardAction, privateWizardCode } from './actions/showPrivateWizard';
import { SHOW_PRIVATE_WIZARD_MODE, SHOW_PUBLIC_WIZARD_MODE, State, Device } from "./State";
import { deleteDeviceCode, deleteDeviceAction, doDeleteDevice } from './actions/deleteDeviceWizard';
import { Action } from "@glonassmobile/codebase-web/Action";

export const INITIAL_STATE : State = {
    auth : {},
}

const reducersMap = {};

reducersMap [deleteDeviceCode] = doDeleteDevice;
reducersMap [setAuthenticatedCode] = doSetAuthenticated;
reducersMap [publicWizardCode] = doPublicWizard;
reducersMap [hideAuthWizardCode] = doHideAuthWizard;
reducersMap [privateWizardCode] = doPrivateWizard;

const reducer = (state = INITIAL_STATE, action: Action<any>) : State => {

    const actionReducer = reducersMap[action.type]
    
    console.log(action);
    
    if (actionReducer) {
        return actionReducer (state, action);
    }
    else {
        return state;
    }
}

export const STORE = createStore(reducer);

export const createDispatcher = (store : Store<State, any>) => ({
    setAuthenticated : (email : string) => store.dispatch (setAuthenticatedAction (email)),
    showPublicWizard : (mode : SHOW_PUBLIC_WIZARD_MODE) => store.dispatch(publicWizardAction(mode)),
    hideAuthWizard : () => store.dispatch(hideAuthWizardAction()),
    showPrivateWizard : (mode : SHOW_PRIVATE_WIZARD_MODE) => store.dispatch(privateWizardAction(mode)),
    deleteDevice : (device : Device) => store.dispatch(deleteDeviceAction(device))
})

export const STATE_API = createDispatcher (STORE)

