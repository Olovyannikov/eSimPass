import { Action } from "@glonassmobile/codebase-web/Action";

export const createAction = <T>(type : string, payload?: T) : Action<T> => {
    return {
        type,
        payload
    }
}
