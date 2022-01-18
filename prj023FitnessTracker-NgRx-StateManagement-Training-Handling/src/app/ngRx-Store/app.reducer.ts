/*
this is the app wide reducer which groups together other reducers
*/

/****** 
 * important: training is lazy loaded so can't add training here. Check training reducer and action for more details. 
 * Trainng will know about the app reducer 
 * ngRx will inject training into the app reducer when loading
 * *****/

//import the UIReducer 
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUiReducer from './ui.reducer';
import * as fromAuthReducer from './auth.reducer';

//define application wide state 
export interface AppState {
    ui: fromUiReducer.UiLoadingStateFlag; 
    auth: fromAuthReducer.AuthStateFlag;
};

//group all the reducers 
export const reducers: ActionReducerMap<AppState> = {
    //use the reducer from the ui.reducer.ts, auth.reducer.ts
    ui: fromUiReducer.uiReducer,
    auth: fromAuthReducer.authReducer
};

/********************** UI ***********************/
//create utility function to create a feature selector. selectors are helpful functions that make it easy to pull information from our state 
//createFeatureSelector is generic function where thr type will be our interface LoadingStateFlag and then will pull the 'ui' slice of the store
//it will allow us to get quick access to AppState.ui which is being returned by reducer.ui above
export const getUiState = createFeatureSelector<fromUiReducer.UiLoadingStateFlag>('ui');

//create utility function which gives us uiIsLoadingFlag state by creating a selector.  
//pass to it the getUiState (above) reference and ui reducers getIsUiLoadingFlag reference.
//from the state we'll get the loding property value 
//this is usefull in accessing it in components
export const getIsUiLoadingFlag = createSelector(getUiState, fromUiReducer.getIsUiLoadingFlag);

/********************** AUTH ***********************/
//create utility function to create a feature selector. selectors are helpful functions that make it easy to pull information from our state 
//createFeatureSelector is generic function where thr type will be our interface LoadingStateFlag and then will pull the 'auth' slice of the store
//it will allow us to get quick access to AppState.auth which is being returned by reducer.auth above
export const getAuthState = createFeatureSelector<fromAuthReducer.AuthStateFlag>('auth');

//create utility function which gives us uiIsLoadingFlag state by creating a selector.  
//pass to it the getUiState (above) reference and ui reducers getIsUiLoadingFlag reference.
//from the state we'll get the loding property value 
//this is usefull in accessing it in components
export const getIsAuthenticatedFlag = createSelector(getAuthState, fromAuthReducer.getIsAuthFlag);
