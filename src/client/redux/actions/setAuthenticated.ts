import { Action } from "@glonassmobile/codebase-web/Action";
import { createAction } from "./createAction";
import { State } from "./../State";
import { INITIAL_STATE } from "./../StateApi";

export const setAuthenticatedCode = 'setAuthenticated';

export const setAuthenticatedAction = (login : string) => createAction(setAuthenticatedCode, login);

export const doSetAuthenticated = (state = INITIAL_STATE, action : Action<string>) : State => ({
    ...state, 
    ...{ auth : {
        email : action.payload
    }}
});
