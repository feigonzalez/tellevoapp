import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilConductorPageRoutingModule } from './perfil-conductor-routing.module';

import { PerfilConductorPage } from './perfil-conductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PerfilConductorPageRoutingModule
  ],
  declarations: [PerfilConductorPage]
})
export class PerfilConductorPageModule {}
