/*
First implement ui.actions and then ui.reducer.ts
*/

import { Action } from "@ngrx/store";
import { UiActions, UI_LOADING_FLAG } from "./ui.actions";

//create an interface to flag loading state 
//this is the interface which will get hooked into
export interface UiLoadingStateFlag {
    isLoading: boolean;
};

//create initial loading flag state 
const uiInitialLoadingStateFlag: UiLoadingStateFlag = {
    isLoading: false
};

//create a rducer function for the UI
//action is of type UiActions (custom type) which is in ui.actions.ts
export function uiReducer(state = uiInitialLoadingStateFlag, action: UiActions){
    switch (action.type){
        case UI_LOADING_FLAG.START_LOADING:
            return { isLoading: true }; //show spinner
        case UI_LOADING_FLAG.STOP_LOADING:
            return { isLoading: false }; //hide spinner
        default: 
            return state; //default
    }
}

//implement a helper constant which will give us the loading flag from the state that is passed to it.  
//it is an arrow function 
export const getIsUiLoadingFlag = (loadingState: UiLoadingStateFlag) => loadingState.isLoading;