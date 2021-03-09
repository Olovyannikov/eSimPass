import { Action } from "@glonassmobile/codebase-web/Action";
import { createAction } from "@glonassmobile/codebase-web/createAction";
import { State, SHOW_AUTH_WIZARD_MODE } from "./../State";
import { INITIAL_STATE } from "./../StateApi";

export const showAuthWizardCode = 'showAuthWizard';

export const showAuthWizardAction = (mode : SHOW_AUTH_WIZARD_MODE) => createAction(showAuthWizardCode, mode);

export const doShowAuthWizard = (state = INITIAL_STATE, action : Action<SHOW_AUTH_WIZARD_MODE>) : State => ({
    ...state,
    showAuthWizard : action.payload
})
