import { Action } from "@ngrx/store";

//the convention is that in the string part, inside [] put the reducer name
export class Auth_FLAG {
    public static SET_AUTHENTICATED = '[AUTH] Set Authenticated';
    public static SET_UNAUTHENTICATED = '[AUTH] Set UnAuthenticated';
};

//export action creator or classes so that we get auto completion support
export class SetAuthenticated implements Action {
    readonly type = Auth_FLAG.SET_AUTHENTICATED;
};
export class SetUnAuthenticated implements Action {
    readonly type = Auth_FLAG.SET_UNAUTHENTICATED;
};

//export a custom type to be used by the authReducer in auth.reducer.ts file
export type AuthActions = SetAuthenticated | SetUnAuthenticated;