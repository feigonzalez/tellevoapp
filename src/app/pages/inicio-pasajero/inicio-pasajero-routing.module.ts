import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPasajeroPage } from './inicio-pasajero.page'; // Cambio de nombre aquí

const routes: Routes = [
  {
    path: '',
    component: InicioPasajeroPage, // Cambio de nombre aquí
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPasajeroPageRoutingModule {} // Cambio de nombre aquí
