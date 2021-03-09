import { Store } from "redux";
import { createStore } from "redux";
import { doSetAuthenticated, setAuthenticatedCode, setAuthenticatedAction } from "./actions/setAuthenticated";
import { doShowAuthWizard, showAuthWizardCode, showAuthWizardAction } from './actions/showAuthWizard';
import { SHOW_AUTH_WIZARD_MODE, State } from "./State";
import { Action } from "@glonassmobile/codebase-web/Action";

export const INITIAL_STATE : State = {
    auth : {},
}

const reducersMap = {};

reducersMap [setAuthenticatedCode] = doSetAuthenticated;
reducersMap [showAuthWizardCode] = doShowAuthWizard;

const reducer = (state = INITIAL_STATE, action: Action<any>) : State => {

    const actionReducer = reducersMap[action.type]
    
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
    showAuthWizard : (mode : SHOW_AUTH_WIZARD_MODE) => store.dispatch(showAuthWizardAction(mode))
})

export const STATE_API = createDispatcher (STORE)

