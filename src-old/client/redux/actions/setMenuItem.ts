import { Action } from "@glonassmobile/codebase/client/Action";
// import { createAction } from "@glonassmobile/codebase/client/createAction";
import dynamic from 'next/dynamic';
const createAction = dynamic(() => import('@glonassmobile/codebase-web/createAction' as any), {
    ssr : false
})
import { State } from "./../State";
import { INITIAL_STATE, MenuItems } from "./../StateApi";

export const setMenuItemCode = 'setMenuItem';

export const setMenuItemAction = (menuItem : MenuItems) => createAction(setMenuItemCode, menuItem);

export const doSetMenuItem = (state = INITIAL_STATE, action : Action<MenuItems>) : State => ({
    ...state,
    menu: action.payload
})
