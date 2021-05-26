import { Action } from "@glonassmobile/codebase-web/Action";
import { createAction } from "@glonassmobile/codebase-web/createAction";
import { ListRatesResponse } from "../../generated/proto.web";
import { State } from "./../State";
import { INITIAL_STATE } from "./../StateApi";

export const setListRatesCode = 'setListRates';

export const setListRatesAction = (rates : ListRatesResponse.SuccessModel.RateModel[]) => createAction(setListRatesCode, rates);

export const doSetLitRates = (state = INITIAL_STATE, action : Action<ListRatesResponse.SuccessModel.RateModel[]>) : State => ({
    ...state,
    listRates : action.payload,
})
