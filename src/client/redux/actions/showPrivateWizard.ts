import { Action } from "@glonassmobile/codebase-web/Action";
import { createAction } from "@glonassmobile/codebase-web/createAction";
import { State, SHOW_PRIVATE_WIZARD_MODE } from "../State";
import { INITIAL_STATE } from "../StateApi";

export const privateWizardCode = 'privateWizard';

export const privateWizardAction = (mode : SHOW_PRIVATE_WIZARD_MODE) => createAction(privateWizardCode, mode);

export const doPrivateWizard = (state = INITIAL_STATE, action : Action<SHOW_PRIVATE_WIZARD_MODE>) : State => ({
    ...state,
    privateWizard : {
        stage : action.payload
    }
})
