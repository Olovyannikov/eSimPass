import { Action } from "@glonassmobile/codebase/client/Action";
import { createAction } from "@glonassmobile/codebase/client/createAction";
import { State, Modals } from "./../State";
import { INITIAL_STATE } from "./../StateApi";

export const setModalCode = 'setModal';
export const setModalCloseCode = 'setModalClose';

export const setModalAction = (modal : Modals) => createAction(setModalCode, modal);
export const setModalCloseAction = () => createAction(setModalCloseCode);

export const doSetModal = (state = INITIAL_STATE, action : Action<Modals>) : State => ({
    ...state,
    modal : action.payload
})

export const doSetModalClose = (state = INITIAL_STATE) : State =>({
    ...state,
    modal : ''
})

