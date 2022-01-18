/*
First implement auth.actions and then auth.reducer.ts
*/

import { Action } from "@ngrx/store";
import { AuthActions, Auth_FLAG } from "./auth.actions";

//create an interface to flag authentication state 
//this is the interface which will get hooked into
export interface AuthStateFlag {
    isAuthenticated: boolean;
};

//create initial loading flag state 
const authInitialStateFlag: AuthStateFlag = {
    isAuthenticated: false
};

//create a rducer function for the auth
//action is of type AuthActions (custom type) which is in auth.actions.ts
export function authReducer(state = authInitialStateFlag, action: AuthActions){
    switch (action.type){
        case Auth_FLAG.SET_AUTHENTICATED:
            return { isAuthenticated: true }; //authenticated
        case Auth_FLAG.SET_UNAUTHENTICATED:
            return { isAuthenticated: false }; //not authenticated
        default: 
            return state; //default
    }
}

//implement a helper constant which will give us the authenticated flag from the state that is passed to it.  
//it is an arrow function 
export const getIsAuthFlag = (authState: AuthStateFlag) => authState.isAuthenticated;