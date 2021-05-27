import { Action } from "@glonassmobile/codebase/client/Action";
// import { createAction } from "@glonassmobile/codebase/client/createAction";
let createAction : any
import { State } from "./../State";
import { INITIAL_STATE } from "./../StateApi";

export const setAuthenticatedCode = 'setAuthenticated';
export const setVerificationCode = 'setVerification';
export const setLogoutCode = 'setLogout';

export const setAuthenticatedAction = (login : string) => createAction(setAuthenticatedCode, login);
export const setVerificationAction = (value : boolean) => createAction(setVerificationCode, value)
export const setLogoutAction = () => createAction(setLogoutCode)

export const doSetAuthenticated = (state = INITIAL_STATE, action : Action<string>) : State => ({
    ...state, 
    ...{ auth : {
        login : action.payload
    }}
    // ...state,
    // ...{
    //     ...{
    //         auth : {
    //             login : action.payload,
    //         }
    //     }
    // }
});

export const doSetVErification = (state = INITIAL_STATE, action : Action<boolean>) : State => ({
    ...state,
    ...{
        ...{
            auth : {
                verify : action.payload,
            }
        }
    }
})

export const doSetLogout = (state = INITIAL_STATE) : State => ({
    ...state,
    ...{
        ...{
            auth : {
                login : null
            }
        }
    }
})
