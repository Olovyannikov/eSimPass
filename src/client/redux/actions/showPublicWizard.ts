import { Action } from "@glonassmobile/codebase-web/Action";
import { createAction } from "./createAction";
import { State, SHOW_PUBLIC_WIZARD_MODE } from "../State";
import { INITIAL_STATE } from "../StateApi";

export const publicWizardCode = 'publicWizard';

export const publicWizardAction = (mode : SHOW_PUBLIC_WIZARD_MODE) => createAction(publicWizardCode, mode);

export const doPublicWizard = (state = INITIAL_STATE, action : Action<SHOW_PUBLIC_WIZARD_MODE>) : State => ({
    ...state,
    publicWizard : action.payload
})
