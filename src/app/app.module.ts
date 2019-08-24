import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InventoryServiceProvider } from '../providers/inventory-service/inventory-service';
import { InputDialogServiceProvider } from '../providers/input-dialog-service/input-dialog-service';

import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpClientModule } from '@angular/common/http'; // imports HTTP Client Module
import { ImagePicker } from '@ionic-native/image-picker'; // imports Image Picker
import { Camera } from '@ionic-native/camera'; // imports Camera
import { Crop } from '@ionic-native/crop'; // imports Crop

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // HTTP Client Module
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InventoryServiceProvider,
    InputDialogServiceProvider,
    SocialSharing, // Social Sharing
    ImagePicker, // Image Picker
    Camera, // Camera
    Crop // Crop
  ]
})
export class AppModule {}
