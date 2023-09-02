import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeConductorPageRoutingModule } from './viaje-conductor-routing.module';

import { ViajeConductorPage } from './viaje-conductor.page';
import { ComponentsModule } from 'src/app/components/components.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViajeConductorPageRoutingModule
  ],
  declarations: [ViajeConductorPage]
})
export class ViajeConductorPageModule {}
