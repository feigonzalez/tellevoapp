import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerRutaPageRoutingModule } from './ver-ruta-routing.module';

import { VerRutaPage } from './ver-ruta.page';
import { ComponentsModule } from 'src/app/components/components.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerRutaPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [VerRutaPage]
})
export class VerRutaPageModule {}
