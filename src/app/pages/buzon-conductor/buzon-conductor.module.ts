import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuzonConductorPageRoutingModule } from './buzon-conductor-routing.module';

import { BuzonConductorPage } from './buzon-conductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuzonConductorPageRoutingModule
  ],
  declarations: [BuzonConductorPage]
})
export class BuzonConductorPageModule {}
