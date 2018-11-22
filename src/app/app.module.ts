import { AccountPage } from './../pages/account/account';
import { ResetpasswordPage } from './../pages/resetpassword/resetpassword';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { SplashPage } from './../pages/splash/splash';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import * as firebase from 'firebase';
import { ProfileproviderProvider } from '../providers/profileprovider/profileprovider';
import { ProfileProvider } from '../providers/profile/profile';
import { BookingProvider } from '../providers/booking/booking';


const config = {
    apiKey: "AIzaSyCGPAA_jV7Z9v6ySTERn9wiX1uFjggzjSY",
    authDomain: "bussystemproject.firebaseapp.com",
    databaseURL: "https://bussystemproject.firebaseio.com",
    projectId: "bussystemproject",
    storageBucket: "bussystemproject.appspot.com",
    messagingSenderId: "423126747142"
};

firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SplashPage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    AccountPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SplashPage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    AccountPage
  ],
  
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ProfileproviderProvider,
    ProfileProvider,
    BookingProvider
  ]
})
export class AppModule {}
