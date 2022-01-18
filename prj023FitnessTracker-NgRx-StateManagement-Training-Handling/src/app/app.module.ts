import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//angular fire 
import { AngularFireModule } from '@angular/fire/compat';

//feature modules
import { AuthModule } from './Modules/Feature/auth.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { WelcomeComponent } from './Site/welcome/welcome.component';
import { HeaderComponent } from './Nav/header/header.component';
import { SidenavListComponent } from './Nav/sidenav-list/sidenav-list.component';

import { AuthService } from './Services/auth.service';
import { environment } from '../environments/environment';


//ngrx ==> training ngrx reducer is in training.module.ts since it is getting lazy loaded
import { StoreModule } from '@ngrx/store';
import { reducers } from './ngRx-Store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase), //keep this at the top level, AngularFirestoreModule and AngularFireAuthModule moved to ng-fire module that is being called inside shared module
    //SiteSharedModule, //ng-fire, material, forms, FlexLayoutModule etc, auth and training are doing an export so these will be available at the top site level as well
    AuthModule, //featue module
    //TrainingModule //feature module, now available via lazy loading
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
