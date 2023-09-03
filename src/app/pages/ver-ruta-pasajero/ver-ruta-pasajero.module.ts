import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { VerRutaPasajeroPageRoutingModule } from './ver-ruta-pasajero-routing.module';


import { VerRutaPasajeroPage } from './ver-ruta-pasajero.page';


import { ComponentsModule } from 'src/app/components/components.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRutaPasajeroPageRoutingModule, 
    ComponentsModule, 
  ],
  declarations: [VerRutaPasajeroPage], 
})
export class VerRutaPasajeroPageModule {}