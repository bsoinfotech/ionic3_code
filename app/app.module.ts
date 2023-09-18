import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {DatePipe} from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation';

import { Items } from '../mocks/providers/items';
import { Settings, User, Api } from '../providers';
import { General } from '../providers/general/general';

import { MyApp } from './app.component';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geofence } from '@ionic-native/geofence';
import { Network } from '@ionic-native/network';

import { HTTP } from '@ionic-native/http';  //////////////////////////////////////////////////
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx/ngx'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'

import { AppMinimize } from '@ionic-native/app-minimize';
//import { ScrollableTabs } from '../components/scrollable-tabs/scrollable-tabs';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
//import { GooglePlus } from '@ionic-native/google-plus';
//import { CallNumber } from '@ionic-native/call-number';
import {SidebarService} from '../services/sidebar.service';

import { SocialSharing } from '@ionic-native/social-sharing';

import { GooglePlus } from '@ionic-native/google-plus';

 // import { AppUpdate } from '@ionic-native/app-update/ngx';
// import { AppUpdate } from '@ionic-native/app-update';
import { OneSignal } from '@ionic-native/onesignal';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service'; //biplab

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    //ScrollableTabs
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,   
    Items,
    User,
    General,
    Camera,    
    DatePipe, 
    SplashScreen,
    Geolocation,
    StatusBar,
    FileTransfer,
    File,
ImagePicker,
Geofence,
Network,
HTTP,
OneSignal,
//NetworkService, //biplab
InAppBrowser, // ---> Add it here

//AppUpdate,
AppMinimize,
NativeGeocoder,
PhotoViewer,
SidebarService,
SocialSharing,
Facebook,
GooglePlus,
     { provide: Settings, useFactory: provideSettings, deps: [Storage] },
	// {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
     ConnectivityServiceProvider
	//,ConnectivityService
  ]
})
export class AppModule { }
