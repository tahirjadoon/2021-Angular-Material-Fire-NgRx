/***************** other than interface interface, verbose way start  */

    //app wide ngrx store
    /*
    have
    1. model ==> LoadingState interface with initial state
    2. action ==> actions are messages that are dispatched, which we need to implement
    3. const reducer = createReducer
    3. export function
    */


    import { Action, createAction, createReducer, on } from "@ngrx/store";
    import { NgRxConstants } from "./ng-rx.constants";

    //1. State interface
    export interface LoadingState {
        isLoading: boolean;
    }

    //2. initial state is of type State
    export const initialState: LoadingState = {
        isLoading: false //first implementation was in ui.service.ts
    };

    //3. actions are messages that are dispatched
    export const SpinnerShowAction = createAction(NgRxConstants.SPINNER_START_LOADING);
    export const SpinnerHideAction = createAction(NgRxConstants.SPINNER_STOP_LOADING);

    //4. Reducer 
    const reducer = createReducer(
        initialState, 
        on(SpinnerShowAction, state => {
            return {isLoading: true};
        }),
        on(SpinnerHideAction, state => {
            return {isLoading: false};
        })
    );

    //5. export spinner loading reducer
    /**
     * 
     * @param state : of type LoadingState interface
     * @param action : action performed per actions specified 
     * @returns new loadingState of type LoadingState interface
     */
    export function loadingReducer(state: LoadingState = initialState, action: Action){
        return reducer(state, action);
    }
/***************** other than interface interface, verbose way end  */

/******************************  SIMPLE WAY  */
    /**
     * dispatch the action to change the store
     * @param state 'old satte'
     * @param action 'incoming action'
     */
    export function loadingSpinnerReducerSimple(state = initialState, action){
        switch(action.type){
            case NgRxConstants.SPINNER_START_LOADING:
                const startState: LoadingState = { isLoading: true };
                return startState;
            case NgRxConstants.SPINNER_STOP_LOADING:
                const stopState: LoadingState = { isLoading: false };
                return stopState;
            default:
                return state;
        }
    }

/******************************  SIMPLE WAY end */
