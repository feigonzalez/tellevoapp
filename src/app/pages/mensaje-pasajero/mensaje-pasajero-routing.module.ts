import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensajePasajeroPage } from './mensaje-pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: MensajePasajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensajePasajeroPageRoutingModule {}
