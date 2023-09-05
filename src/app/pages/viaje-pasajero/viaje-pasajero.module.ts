import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajePasajeroPageRoutingModule } from './viaje-pasajero-routing.module';

import { ViajePasajeroPage } from './viaje-pasajero.page';
import { ComponentsModule } from 'src/app/components/components.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViajePasajeroPageRoutingModule
  ],
  declarations: [ViajePasajeroPage]
})
export class ViajePasajeroPageModule {}
