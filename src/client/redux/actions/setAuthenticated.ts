import { Action } from "@glonassmobile/codebase/client/Action";
import { createAction } from "@glonassmobile/codebase/client/createAction";
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
