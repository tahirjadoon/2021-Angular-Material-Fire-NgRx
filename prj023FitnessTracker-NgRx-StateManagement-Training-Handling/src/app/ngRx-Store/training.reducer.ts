/*
First implement training.actions and then training.reducer.ts
*/

import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import { TrainingActions, Training_FLAG } from "./training.actions";

import * as fromAppReducer from './app.reducer';

import { ExerciseModel } from "../Models/exercise.model";

//training is lazy loaded so can't add training reducer to app reducer like auth and ui
//app reducer doesnt know about the trainingstate but trainning state will know about the AppState
//training reducer will get added to Modules/Feature/training.module.ts

//create an interface to training state 
//this is the interface which will get hooked into
//we have three different types of trainings that are being used in the training service 
export interface TrainingState {
    availableExercises: ExerciseModel[];
    pastExercises: ExerciseModel[];
    activeTraining: ExerciseModel;

};

//since we are lazy loading
//create a second interface which will implment AppSate from add.reducer
export interface AppState extends fromAppReducer.AppState{
    training: TrainingState
}

//create initial loading  state 
const trainingInitialState: TrainingState = {
    availableExercises: [],
    pastExercises: [],
    activeTraining: null
};

//create a rducer function for the training
//action is of type TrainingActions (custom type) which is in training.actions.ts
export function trainingReducer(state = trainingInitialState, action: TrainingActions){
    switch (action.type){
        //distribute the old state first 
            //if dont do ...state then the old state will be lost
            //we only want to overwrite the particular item
        case Training_FLAG.SET_AVAILABLE_TRAININGS:
            return { 
                ...state,
                availableExercises: action.payload
            } 
        case Training_FLAG.SET_PAST_TRAININGS:
            return { 
                ...state,
                pastExercises: action.payload
            } 
        case Training_FLAG.START_TRAINING:
            return { 
                ...state,
                //we are receiving the id od the selected training
                //create a new copy, immutable
                activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
            }
        case Training_FLAG.STOP_TRAINING:
            return { 
                ...state,
                activeTraining: null
            }
        default: 
            return state; //default
    }
}

//implement a helper constant which will give us the data
//it is an arrow function 
//important: check the training.module to see the 'training' selector use there as well
export const TRAINING_REDUCER_SELECTOR = "training";
export const getTainingState  = createFeatureSelector<TrainingState>(TRAINING_REDUCER_SELECTOR);

//get available exercises
export const getAvailableExercises = createSelector(getTainingState, 
                                                    (trainingState: TrainingState) => trainingState.availableExercises);
//get past exercises
export const getPastExercises = createSelector(getTainingState, 
                                                    (trainingState: TrainingState) => trainingState.pastExercises);
//get active training
export const getActiveTraining = createSelector(getTainingState, 
                                                    (trainingState: TrainingState) => trainingState.activeTraining);
//check we have active training ongoing
export const getIsOngoingTraining = createSelector(getTainingState, 
                                                    (trainingState: TrainingState) => trainingState.activeTraining != null);