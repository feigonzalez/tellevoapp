import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPasajeroPageRoutingModule } from './inicio-pasajero-routing.module';

import { InicioPasajeroPage } from './inicio-pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPasajeroPageRoutingModule
  ],
  declarations: [InicioPasajeroPage]
})
export class InicioPasajeroPageModule {}
