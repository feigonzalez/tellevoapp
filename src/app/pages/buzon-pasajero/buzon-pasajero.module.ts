import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuzonPasajeroPageRoutingModule } from './buzon-pasajero-routing.module';

import { BuzonPasajeroPage } from './buzon-pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuzonPasajeroPageRoutingModule
  ],
  declarations: [BuzonPasajeroPage]
})
export class BuzonPasajeroPageModule {}

