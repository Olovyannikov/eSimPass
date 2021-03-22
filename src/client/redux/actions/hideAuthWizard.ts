import { createAction } from "@glonassmobile/codebase-web/createAction";
import { State } from "./../State";
import { INITIAL_STATE } from "./../StateApi";

export const hideAuthWizardCode = 'hideAuthWizard';

export const hideAuthWizardAction = () => createAction(hideAuthWizardCode);

export const doHideAuthWizard = (state = INITIAL_STATE) : State => ({
    ...state,
    publicWizard : null,
    privateWizard : null,
})
