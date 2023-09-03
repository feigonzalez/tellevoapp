import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { VerRutaPasajeroPage } from './ver-ruta-pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: VerRutaPasajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerRutaPasajeroPageRoutingModule {}
