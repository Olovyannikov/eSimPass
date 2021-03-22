import { Action } from "@glonassmobile/codebase-web/Action";
import { createAction } from "@glonassmobile/codebase-web/createAction";
import { State, BuyPackWizard } from "../State";
import { INITIAL_STATE } from "../StateApi";

export const buyPackCode = 'buyPack';

export const buyPackAction = (pack : BuyPackWizard) => createAction(buyPackCode, pack);

export const doBuyPack = (state = INITIAL_STATE, action : Action<BuyPackWizard>) : State => ({
    ...state,
    privateWizard : {
        stage : 'buyPack',
        pack : action.payload
    }
})
