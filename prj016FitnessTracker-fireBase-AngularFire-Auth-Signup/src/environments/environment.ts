// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fireBaseCollectionNames: {
	  availableExercises: "availableExercises",
    finishedExercises: "finishedExercises"
  },
  firebase: {
    apiKey: "AIzaSyDYi93LEvIaH0_4dcK3FxjU16LgIPkTVeE",
      authDomain: "ng-fitness-tracker-2b3a5.firebaseapp.com",
      projectId: "ng-fitness-tracker-2b3a5",
      storageBucket: "ng-fitness-tracker-2b3a5.appspot.com",
      messagingSenderId: "288945271319",
      appId: "1:288945271319:web:08592fa6eac33d46cbe252",
      measurementId: "G-9ZQD9HYZE0"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
