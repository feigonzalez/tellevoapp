import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensajeConductorPageRoutingModule } from './mensaje-conductor-routing.module';

import { MensajeConductorPage } from './mensaje-conductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensajeConductorPageRoutingModule
  ],
  declarations: [MensajeConductorPage]
})
export class MensajeConductorPageModule {}
