import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPasajeroPageRoutingModule } from './perfil-pasajero-routing.module'; // Cambio de nombre aquí

import { PerfilPasajeroPage } from './perfil-pasajero.page'; // Cambio de nombre aquí

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PerfilPasajeroPageRoutingModule, // Cambio de nombre aquí
  ],
  declarations: [PerfilPasajeroPage], // Cambio de nombre aquí
})
export class PerfilPasajeroPageModule {} // Cambio de nombre aquí
