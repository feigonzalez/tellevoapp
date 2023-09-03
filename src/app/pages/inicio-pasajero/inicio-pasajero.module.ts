import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPasajeroPageRoutingModule } from './inicio-pasajero-routing.module'; // Cambio de nombre aquí

import { InicioPasajeroPage } from './inicio-pasajero.page'; // Cambio de nombre aquí

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPasajeroPageRoutingModule, // Cambio de nombre aquí
  ],
  declarations: [InicioPasajeroPage], // Cambio de nombre aquí
})
export class InicioPasajeroPageModule {} // Cambio de nombre aquí
