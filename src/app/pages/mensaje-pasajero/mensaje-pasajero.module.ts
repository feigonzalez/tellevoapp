import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensajePasajeroPageRoutingModule } from './mensaje-pasajero-routing.module';

import { MensajePasajeroPage } from './mensaje-pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensajePasajeroPageRoutingModule
  ],
  declarations: [MensajePasajeroPage]
})
export class MensajePasajeroPageModule {}
