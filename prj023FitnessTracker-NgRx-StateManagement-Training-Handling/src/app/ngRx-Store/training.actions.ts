import { Action } from "@ngrx/store";
import { ExerciseModel } from "../Models/exercise.model";

//the convention is that in the string part, inside [] put the reducer name
export class Training_FLAG {
    public static SET_AVAILABLE_TRAININGS = '[TRAINING] Set Available Trainings';
    public static SET_PAST_TRAININGS = '[TRAINING] Set Past Trainings';
    public static START_TRAINING = '[TRAINING] Set Start Training';
    public static STOP_TRAINING = '[TRAINING] Set Stop Training';
};

//export action creator or classes so that we get auto completion support
//these class dont have a type, these have a payload as well
export class SetAvailableTrainings implements Action {
    readonly type = Training_FLAG.SET_AVAILABLE_TRAININGS;
    //will receive payload
    constructor(public payload: ExerciseModel[]){}
};
export class SetPastTrainings implements Action {
    readonly type = Training_FLAG.SET_PAST_TRAININGS;
    //will receive payload
    constructor(public payload: ExerciseModel[]){}
};
export class StartTraining implements Action {
    readonly type = Training_FLAG.START_TRAINING;
    //will receive the training id that is started
    constructor(public payload: string){}
};
export class StopTraining implements Action {
    readonly type = Training_FLAG.STOP_TRAINING;
    //no payload here when stoping the training, it is still needed other wise it will complain in training.reducer.ts
    constructor(public payload: any = null){}
};

//export a custom type to be used by the trainingReducer in training.reducer.ts file
export type TrainingActions = SetAvailableTrainings | SetPastTrainings | StartTraining | StopTraining;