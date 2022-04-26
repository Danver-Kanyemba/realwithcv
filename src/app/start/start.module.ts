// import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartPageRoutingModule } from './start-routing.module';

import { StartPage } from './start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartPageRoutingModule,
    // AndroidPermissions 
  ],
  declarations: [
    StartPage
  ]
})
export class StartPageModule {}
