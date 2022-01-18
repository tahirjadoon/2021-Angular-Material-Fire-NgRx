/*
First implement ui.actions and then ui.reducer.ts
*/

//create constants for the loading flag. These will be used by the actions
import { Action } from "@ngrx/store";

//the convention is that in the string part, inside [] put the reducer name
export class UI_LOADING_FLAG {
    public static START_LOADING = '[UI] Start Loading';
    public static STOP_LOADING = '[UI] Stop Loading';
};

//export action creator or classes so that we get auto completion support
export class UiStartLoadingAction implements Action {
    readonly type = UI_LOADING_FLAG.START_LOADING;
};
export class UiStopLoadingAction implements Action {
    readonly type = UI_LOADING_FLAG.STOP_LOADING;
};

//export a custom type to be used by the uiReducer in ui.reducer.ts file
export type UiActions = UiStartLoadingAction | UiStopLoadingAction; 
